/* eslint-disable no-shadow */
import React, {useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import {num2numDong} from '@services/utils';
import {CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  repairStyles as styles,
  appointmentStyles as appStyles,
  css,
} from '@styles/index';
import {
  IcAccount,
  IcCar,
  IcInterView,
  IcAppointment,
  IcInfo,
} from '@common/svg/index';
import {
  setServiceLabor,
  setServiceMaterial,
  setTotalServiceUndiscount,
  setTotalService,
  setTotalMaterialUndiscount,
  setTotalMaterial,
  setTotalAmountUndiscount,
  setTotalAmount,
  setAmountDiscount,
  setAmountTax,
  setAmountCustomerTotal,
  setAmountInsurance,
  setAmountInternal,
} from '@stores/appointment/actions';
import {Colors} from '@styles/index';
import {formatDate} from '@services/utils';
import {LocalizationContext} from '@context/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {InputGrey, LineInput, PickerDateTime} from '@components/forms/index';

function CustomerTab(item, disabled) {
  const {t} = useContext(LocalizationContext);
  const {
    serviceLabor,
    serviceMaterial,
    totalServiceUndiscount,
    totalService,
    totalMaterialUndiscount,
    totalMaterial,
    totalAmount,
    totalAmountUndiscount,
    amountDiscount,
    amountTax,
    amountCustomerTotal,
    amountInsurance,
    amountInternal,
    customerSignature,
    advisorSignature,
  } = useSelector((st) => st.appointment);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const defaultValue = item.item.params;

  React.useEffect(() => {
    dispatch(
      setTotalServiceUndiscount(
        serviceLabor.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.record.x_total_undiscount,
          0,
        ),
      ),
    );
    dispatch(
      setTotalService(
        serviceLabor.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.record.price_total,
          0,
        ),
      ),
    );
    dispatch(
      setTotalMaterialUndiscount(
        serviceMaterial.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.record.x_total_undiscount,
          0,
        ),
      ),
    );
    dispatch(
      setTotalMaterial(
        serviceMaterial.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.record.price_total,
          0,
        ),
      ),
    );
    dispatch(
      setTotalAmountUndiscount(
        serviceMaterial.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.record.x_total_undiscount,
          0,
        ) +
          serviceLabor.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.record.x_total_undiscount,
            0,
          ),
      ),
    );
    dispatch(
      setTotalAmount(
        serviceMaterial.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.record.price_total,
          0,
        ) +
          serviceLabor.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.record.price_total,
            0,
          ),
      ),
    );
    dispatch(
      setAmountDiscount(
        serviceMaterial.reduce(
          (previousValue, currentValue) =>
            previousValue +
            currentValue.record.x_total_undiscount *
              (currentValue.record.discount / 100),
          0,
        ) +
          serviceLabor.reduce(
            (previousValue, currentValue) =>
              previousValue +
              currentValue.record.x_total_undiscount *
                (currentValue.record.discount / 100),
            0,
          ),
      ),
    );
    dispatch(
      setAmountTax(
        serviceMaterial.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.record.price_tax,
          0,
        ) +
          serviceLabor.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.record.price_tax,
            0,
          ),
      ),
    );
    dispatch(
      setAmountInsurance(
        defaultValue?.checkType?.includes(2)
          ? serviceMaterial.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.record.x_amount_insurance_total,
              0,
            ) +
              serviceLabor.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.record.x_amount_insurance_total,
                0,
              )
          : 0,
      ),
    );
    dispatch(
      setAmountInternal(
        defaultValue?.checkType?.includes(5)
          ? serviceLabor
              .filter(function (labor) {
                return labor.record.x_internal_check === 'yes';
              })
              .reduce(
                (previousValue, currentValue) =>
                  previousValue +
                  (currentValue.record.price_total -
                    currentValue.record.x_amount_insurance_total),
                0,
              ) +
              serviceMaterial
                .filter(function (material) {
                  return material.record.x_internal_check === 'yes';
                })
                .reduce(
                  (previousValue, currentValue) =>
                    previousValue +
                    (currentValue.record.price_total -
                      currentValue.record.x_amount_insurance_total),
                  0,
                )
          : 0,
      ),
    );
    dispatch(setAmountCustomerTotal(totalAmount));
  }, [
    amountInsurance,
    amountInternal,
    defaultValue,
    dispatch,
    serviceLabor,
    serviceMaterial,
    totalAmount,
  ]);

  const handleDateHandPlan = (dateStr) => {
    item.setDateHandPlan(dateStr);
  };

  const onDelete = (index) => {
    const newArr = [...item.carServices];
    newArr.splice(index, 1);
    item.setCarServices(newArr);
  };

  const renderEmptyItem = () => {
    return <Text style={styles.noData}>Không có dữ liệu!</Text>;
  };

  const onChangeQtyLabor = (quantity, index) => {
    let qty = quantity === '' ? '0' : quantity;
    let newList = [...serviceLabor];
    let discount =
      newList[index]?.record?.discount === ''
        ? 0
        : newList[index]?.record?.discount;
    let tax_id = parseFloat(newList[index]?.record?.tax_id?.replace('%'));
    newList[index].record.product_uom_qty = qty;
    serviceLabor[index].record.guarantee_check === 'no' ||
    !serviceLabor[index].record.guarantee_check
      ? ((newList[index].record.x_total_undiscount =
          parseFloat(qty) * serviceLabor[index].record.price_unit),
        (newList[index].record.price_subtotal =
          parseFloat(qty) *
          serviceLabor[index]?.record?.price_unit *
          (1 - discount / 100)),
        (newList[index].record.price_tax =
          parseFloat(qty) *
          serviceLabor[index]?.record?.price_unit *
          (1 - discount / 100) *
          (tax_id / 100)),
        (newList[index].record.price_total =
          parseFloat(qty) *
            serviceLabor[index]?.record.price_unit *
            (1 - discount / 100) *
            (tax_id / 100) +
          parseFloat(qty) *
            serviceLabor[index]?.record.price_unit *
            (1 - discount / 100)),
        (newList[index].record.x_insurance_price =
          parseFloat(qty) *
          serviceLabor[index]?.record?.price_unit *
          (1 - discount / 100) *
          (serviceLabor[index]?.record.x_insurance_percent / 100)),
        (newList[index].record.x_amount_insurance_total =
          parseFloat(qty) *
            serviceLabor[index]?.record?.price_unit *
            (1 - discount / 100) *
            (serviceLabor[index]?.record?.x_insurance_percent / 100) +
          parseFloat(qty) *
            serviceLabor[index]?.record?.price_unit *
            (1 - discount / 100) *
            (serviceLabor[index]?.record?.x_insurance_percent / 100) *
            (tax_id / 100)))
      : ((newList[index].record.x_total_undiscount = 0),
        (newList[index].record.price_subtotal = 0),
        (newList[index].record.price_tax = 0),
        (newList[index].record.price_total = 0),
        (newList[index].record.x_insurance_price = 0),
        (newList[index].record.x_amount_insurance_total = 0));
    dispatch(setServiceLabor(newList));
  };

  const onChangeQtyMaterial = (quantity, index) => {
    let qty = quantity === '' ? '0' : quantity;
    let newList = [...serviceMaterial];
    let discount =
      newList[index].record.discount === ''
        ? 0
        : newList[index].record.discount;
    let tax_id = parseFloat(newList[index].record.tax_id.replace('%'));
    newList[index].record.product_uom_qty = qty;
    serviceMaterial[index].record.guarantee_check === 'no' ||
    !serviceMaterial[index].record.guarantee_check
      ? ((newList[index].record.x_total_undiscount =
          parseFloat(qty) * serviceMaterial[index].record.price_unit),
        (newList[index].record.price_subtotal =
          parseFloat(qty) *
          serviceMaterial[index]?.record?.price_unit *
          (1 - discount / 100)),
        (newList[index].record.price_tax =
          parseFloat(qty) *
          serviceMaterial[index]?.record.price_unit *
          (1 - discount / 100) *
          (tax_id / 100)),
        (newList[index].record.price_total =
          parseFloat(qty) *
            serviceMaterial[index].record.price_unit *
            (1 - discount / 100) *
            (tax_id / 100) +
          parseFloat(qty) *
            serviceMaterial[index]?.record.price_unit *
            (1 - discount / 100)),
        (newList[index].record.x_insurance_price =
          parseFloat(qty) *
          serviceMaterial[index]?.record?.price_unit *
          (1 - discount / 100) *
          (serviceMaterial[index]?.record?.x_insurance_percent / 100)),
        (newList[index].record.x_amount_insurance_total =
          parseFloat(qty) *
            serviceMaterial[index]?.record?.price_unit *
            (1 - discount / 100) *
            (serviceMaterial[index]?.record?.x_insurance_percent / 100) +
          parseFloat(qty) *
            serviceMaterial[index]?.record?.price_unit *
            (1 - discount / 100) *
            (serviceMaterial[index]?.record?.x_insurance_percent / 100) *
            (tax_id / 100)))
      : ((newList[index].record.x_total_undiscount = 0),
        (newList[index].record.price_subtotal = 0),
        (newList[index].record.price_tax = 0),
        (newList[index].record.price_total = 0),
        (newList[index].record.x_insurance_price = 0),
        (newList[index].record.x_amount_insurance_total = 0));
    dispatch(setServiceMaterial(newList));
  };

  const onRemoveLabor = (index) => {
    let newList = [...serviceLabor];
    newList.splice(index, 1);
    dispatch(setServiceLabor(newList));
  };

  const onRemoveMaterial = (index) => {
    let newList = [...serviceMaterial];
    newList.splice(index, 1);
    dispatch(setServiceMaterial(newList));
  };

  const renderHeaderWork = () => {
    return (
      <View style={styles.titleHeader}>
        <Text style={styles.txt(Colors.white, 3, 'center')}>Tên công việc</Text>
        <Text style={styles.txt(Colors.white, 3, 'center')}>Mô tả</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>
          Loại công việc
        </Text>
        {defaultValue?.checkType?.includes(3) && (
          <Text style={styles.txt(Colors.white, 1, 'center')}>Bảo hành</Text>
        )}
        {defaultValue?.checkType?.includes(5) && (
          <Text style={styles.txt(Colors.white, 1, 'center')}>Nội bộ</Text>
        )}
        <Text style={styles.txt(Colors.white, 1, 'center')}>ĐVT</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Số lượng</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Đơn giá</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Chưa thuế</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Giảm giá(%)</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Thành tiền</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Thuế</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Tổng thuế</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Tổng</Text>
        {defaultValue?.checkType?.includes(2) && (
          <>
            <Text style={styles.txt(Colors.white, 1.5, 'center')}>
              Bảo hiểm chi trả(%)
            </Text>
            <Text style={styles.txt(Colors.white, 1.5, 'center')}>
              Bảo hiểm chi trả
            </Text>
            <Text style={styles.txt(Colors.white, 1.5, 'center')}>
              Tổng tiền bảo hiểm
            </Text>
          </>
        )}
        <Text style={styles.txt(Colors.white, 0.4, 'center')}> </Text>
      </View>
    );
  };

  const renderHeaderSpare = () => {
    return (
      <View style={styles.titleHeader}>
        <Text style={styles.txt(Colors.white, 2.15, 'center')}>
          Danh mục phụ tùng
        </Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>
          Loại công việc
        </Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>ĐVT</Text>
        {defaultValue?.checkType?.includes(3) && (
          <Text style={styles.txt(Colors.white, 1, 'center')}>Bảo hành</Text>
        )}
        {defaultValue?.checkType?.includes(5) && (
          <Text style={styles.txt(Colors.white, 1, 'center')}>Nội bộ</Text>
        )}
        <Text style={styles.txt(Colors.white, 1, 'center')}>Số lượng</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Đơn giá</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Chưa thuế</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Giảm giá(%)</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Thành tiền</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Thuế</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Tổng thuế</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>Tổng</Text>
        {defaultValue?.checkType?.includes(2) && (
          <>
            <Text style={styles.txt(Colors.white, 1.5, 'center')}>
              Bảo hiểm chi trả(%)
            </Text>
            <Text style={styles.txt(Colors.white, 1.5, 'center')}>
              Bảo hiểm chi trả
            </Text>
            <Text style={styles.txt(Colors.white, 1.5, 'center')}>
              Tổng tiền bảo hiểm
            </Text>
          </>
        )}
        <Text style={styles.txt(Colors.white, 0.4, 'center')}> </Text>
      </View>
    );
  };

  const renderHeaderSurcharge = () => {
    return (
      <View style={styles.titleHeader}>
        <Text style={styles.txt(Colors.white, 2.5, 'center')}>Tên</Text>
        <Text style={styles.txt(Colors.white, 2.5, 'center')}>Mô tả</Text>
        <Text style={styles.txt(Colors.white, 2.5, 'center')}>Đơn giá</Text>
        <Text style={styles.txt(Colors.white, 2.5, 'center')}>Thuế</Text>
      </View>
    );
  };

  const renderItemWork = ({item, index}) => {
    return (
      <View style={styles.titleItem(index)}>
        <Text style={styles.txt(Colors.black, 3)}>
          {item.record.product_name}
        </Text>
        <Text style={styles.txt(Colors.black, 3)}>
          {item.record.product_name}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'center')}>
          {item.record.task_type_name}
        </Text>
        {defaultValue?.checkType?.includes(3) && (
          <Text style={styles.txt(Colors.black, 1, 'center')}>
            {t(item.record.guarantee_check || 'no')}
          </Text>
        )}
        {defaultValue?.checkType?.includes(5) && (
          <Text style={styles.txt(Colors.black, 1, 'center')}>
            {t(item.record.x_internal_check || 'no')}
          </Text>
        )}
        <Text style={styles.txt(Colors.black, 1, 'center')}>
          {item.record.product_uom_name}
        </Text>
        <View style={styles.textInput(1)}>
          <TextInput
            style={styles.input(1)}
            onChangeText={(quantity) => {
              onChangeQtyLabor(quantity, index);
            }}
            clearTextOnFocus={false}
            value={item.record.product_uom_qty.toString()}
            keyboardType={'decimal-pad'}
            placeholder="0"
            multiline={true}
          />
        </View>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.price_unit)}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.x_total_undiscount)}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {item.record.discount === '' ? '0' : item.record.discount}%
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.price_subtotal)}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {item.record.tax_id}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.price_tax || 0)}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.price_total)}
        </Text>
        {defaultValue?.checkType?.includes(2) && (
          <>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {item.record.x_insurance_percent || 0}
            </Text>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {num2numDong(item.record.x_insurance_price || 0)}
            </Text>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {num2numDong(item.record.x_amount_insurance_total || 0)}
            </Text>
          </>
        )}
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => onRemoveLabor(index)}>
          <AntDesign name="delete" color={Colors.black} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemSpare = ({item, index}) => {
    return (
      <View style={styles.titleItem(index)}>
        <Text style={styles.txt(Colors.black, 2.15)}>
          {item.record.product_name}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'center')}>
          {item.record.task_type_name}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'center')}>
          {item.record.product_uom_name}
        </Text>
        {defaultValue?.checkType?.includes(3) && (
          <Text style={styles.txt(Colors.black, 1, 'center')}>
            {t(item.record.guarantee_check || 'no')}
          </Text>
        )}
        {defaultValue?.checkType?.includes(5) && (
          <Text style={styles.txt(Colors.black, 1, 'center')}>
            {t(item.record.x_internal_check || 'no')}
          </Text>
        )}
        <TextInput
          style={styles.input(1)}
          onChangeText={(quantity) => {
            onChangeQtyMaterial(quantity, index);
          }}
          clearTextOnFocus={false}
          value={item.record.product_uom_qty.toString()}
          keyboardType={'decimal-pad'}
          multiline={true}
          placeholder="0"
        />
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.price_unit)}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.x_total_undiscount)}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {item.record.discount === '' ? '0' : item.record.discount}%
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.price_subtotal)}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {item.record.tax_id}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.price_tax || 0)}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'right')}>
          {num2numDong(item.record.price_total)}
        </Text>
        {defaultValue?.checkType?.includes(2) && (
          <>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {item.record.x_insurance_percent || 0}
            </Text>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {num2numDong(item.record.x_insurance_price || 0)}
            </Text>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {num2numDong(item.record.x_amount_insurance_total || 0)}
            </Text>
          </>
        )}
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => onRemoveMaterial(index)}>
          <AntDesign name="delete" color={Colors.black} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.viewItem}>
        <Text style={styles.txtPackage} numberOfLines={1}>
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={() => onDelete(index)}
          style={styles.closecircleo}>
          <AntDesign name="closecircleo" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.customerTab}>
      <View style={styles.title}>
        <IcAppointment fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin tiếp nhận</Text>
      </View>
      <LineInput
        leftTitle={'Tiếp nhận'}
        rightTitle={'Ngày đặt hàng'}
        leftValue={defaultValue.receptionName || ''}
        rightValue={formatDate(defaultValue.dateOrder || ' ')}
        leftUpperCase={true}
        disabled={disabled}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>Có lịch hẹn</Text>
        <CheckBox
          Component={() => (
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={true}
              style={[styles.checkBoxItem]}>
              {defaultValue.bookingId ? (
                <Ionicons
                  name="md-checkmark-sharp"
                  color={Colors.green}
                  size={20}
                />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          )}
        />
        <View style={appStyles.rightTitle} />
        <View style={css.fx_1} />
      </View>
      <View style={styles.title}>
        <IcCar fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin xe</Text>
      </View>
      <LineInput
        leftTitle={t('license_plate')}
        rightTitle={t('current_kilometer_number')}
        leftValue={defaultValue.vehicle.licensePlate || ''}
        rightValue={defaultValue.vehicle.odoMeter || ''}
        leftUpperCase={true}
        disabled={disabled}
      />
      <LineInput
        leftTitle={t('car_manufacturer')}
        rightTitle={t('model')}
        leftValue={defaultValue.vehicle.brandName || ''}
        rightValue={defaultValue.vehicle.modelName || ''}
        leftUpperCase={true}
        disabled={disabled}
      />
      <LineInput
        leftTitle={'Model khác'}
        rightTitle={'Số VIN'}
        leftValue={defaultValue.vehicle.otherModel || ''}
        rightValue={defaultValue.vehicle.vin || ''}
        leftUpperCase={true}
        disabled={disabled}
      />
      <LineInput
        leftTitle={'Số máy'}
        rightTitle={'Mã màu'}
        leftValue={defaultValue.vehicle.engineNo || ''}
        rightValue={defaultValue.vehicle.color || ''}
        leftUpperCase={true}
        disabled={disabled}
      />
      <View style={styles.title}>
        <IcAccount fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('customer_information')}</Text>
      </View>
      <LineInput
        leftTitle={'Tên khách hàng'}
        rightTitle={'Số điện thoại'}
        leftValue={defaultValue.customer.name || ''}
        rightValue={defaultValue.customer.phone || ''}
        leftUpperCase={true}
        disabled={disabled}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>
          {t('province_city')} <Text style={styles.require}>*</Text>
        </Text>
        <TouchableOpacity disabled={disabled} style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>
            {defaultValue.customer.provinceName || t('province_city')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={styles.districtCon(disabled)}>
          <Text style={styles.txtAddress}>
            {defaultValue.customer.districtName || t('select_district')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled} style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>
            {defaultValue.customer.wardName || t('select_ward')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>
          {t('address')} <Text style={styles.require}>*</Text>
        </Text>
        <View style={styles.streetCon}>
          <InputGrey value={defaultValue.customer.street} disabled={disabled} />
        </View>
      </View>
      <LineInput
        leftTitle={'Người liên hệ'}
        rightTitle={'Điện thoại người liên hệ'}
        leftValue={defaultValue.customer.contactName || ''}
        rightValue={defaultValue.customer.contactPhone || ''}
        leftUpperCase={true}
        disabled={disabled}
      />
      <View style={styles.title}>
        <IcInterView fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin dịch vụ</Text>
      </View>
      <View style={styles.addressCon}>
        <Text style={appStyles.leftTitle}>Gói dịch vụ</Text>
        <TouchableOpacity
          disabled={false}
          onPress={() => {
            item.showService();
          }}
          style={styles.cityCon(false)}>
          <Text style={styles.txtAddress}>
            {item.carServices.name || 'Gói dịch vụ'}
          </Text>
        </TouchableOpacity>
        <View style={appStyles.rightTitle}>
          <Text style={appStyles.rightTxt}>
            Ngày dự kiến giao <Text style={styles.require}>*</Text>
          </Text>
        </View>
        <View style={css.fx_1}>
          <PickerDateTime
            disabled={false}
            value={item.dateHandPlan}
            setValue={handleDateHandPlan}
          />
        </View>
      </View>
      {item.carServices.length > 0 && (
        <View style={styles.buttonUse}>
          <Text style={appStyles.leftTitle}> </Text>
          <View disabled={false} style={styles.listPackage} activeOpacity={0.5}>
            <ScrollView horizontal>
              <FlatList
                nestedScrollEnabled={true}
                numColumns={1}
                data={item.carServices}
                renderItem={_renderItem}
                keyExtractor={(_, index) => index.toString()}
                style={styles.flatList}
              />
            </ScrollView>
          </View>
          <View style={appStyles.rightTitle} />
          <View style={css.fx_1} />
        </View>
      )}
      <View style={styles.buttonUse}>
        <Text style={appStyles.leftTitle}> </Text>
        <TouchableOpacity
          disabled={item.carServices.length === 0 ? true : false}
          style={styles.usePackage}
          onPress={() => item.onPressUse()}
          activeOpacity={0.5}>
          <Text style={styles.txtUsePackage}>Sử dụng gói</Text>
        </TouchableOpacity>
        <View style={appStyles.rightTitle} />
        <View style={css.fx_1} />
      </View>
      <View style={styles.serviceInformation}>
        <Text style={styles.txtServiceInformation}>Phần công việc</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={serviceLabor}
          ListHeaderComponent={renderHeaderWork()}
          renderItem={renderItemWork}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyItem}
        />
      </ScrollView>
      <View style={styles.money}>
        <Text style={styles.txtMoney}>
          Tổng chi phí dịch vụ chưa GG - chưa thuế:{' '}
          {num2numDong(totalServiceUndiscount)}
        </Text>
        <Text style={styles.txtMoney}>
          Tổng chi phí dịch vụ: {num2numDong(totalService)}
        </Text>
      </View>
      <View style={styles.serviceInformation}>
        <Text style={styles.txtServiceInformation}>
          Phần Phụ tùng/ dầu mỡ/ vật tư chấp thuận
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={serviceMaterial}
          ListHeaderComponent={renderHeaderSpare()}
          renderItem={renderItemSpare}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyItem}
        />
      </ScrollView>
      <View style={styles.money}>
        <Text style={styles.txtMoney}>
          Tổng chi phí vật tư chưa GG - chưa thuế:{' '}
          {num2numDong(totalMaterialUndiscount)}
        </Text>
        <Text style={styles.txtMoney}>
          Tổng chi phí vật tư: {num2numDong(totalMaterial)}
        </Text>
        <Text style={styles.txtMoney}>Giảm giá: 0 đ</Text>
        <Text style={styles.txtMoney}>
          Tổng chi phí trước giảm giá trước thuế:{' '}
          {num2numDong(totalAmountUndiscount)}
        </Text>
        <Text style={styles.txtMoney}>
          Tổng chi phí sau giảm giá sau thuế: {num2numDong(totalAmount)}
        </Text>
      </View>
      <View style={styles.serviceInformation}>
        <Text style={styles.txtServiceInformation}>Phụ thu</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={[]}
          ListHeaderComponent={renderHeaderSurcharge()}
          // renderItem={renderItemSurcharge}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyItem}
        />
      </ScrollView>
      <Text style={styles.txtMoney}>
        Tổng tiền giảm giá: {num2numDong(amountDiscount)}
      </Text>
      <Text style={styles.txtMoney}>Tổng tiền giảm giá CTKM: 0 đ</Text>
      <Text style={styles.txtMoney}>Thuế: {num2numDong(amountTax)}</Text>
      <Text style={styles.txtMoney}>Tổng tiền phụ phí: 0 đ</Text>
      <Text style={styles.txtMoney}>Tổng tiền giảm trừ: 0 đ</Text>
      <Text style={styles.txtMoney}>
        Tổng tiền bảo hiểm: {num2numDong(amountInsurance)}
      </Text>
      <Text style={styles.txtMoney}>
        Tổng tiền nội bộ: {num2numDong(amountInternal)}
      </Text>
      <Text style={styles.txtMoney}>
        Tổng tiền khách hàng: {num2numDong(amountCustomerTotal)}
      </Text>
      <View style={styles.title}>
        <IcInfo fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('confirmation_information')}</Text>
      </View>
      <View style={styles.sigCon}>
        <View style={css.fx_1}>
          <Text style={styles.titleSignature}>Chữ ký xác nhận báo giá</Text>
          <TouchableOpacity
            style={styles.signatureConReceive}
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('SignatureQuotation', {
                type: 'customer',
              });
            }}>
            <Text style={styles.txtCusSignature}>Khách hàng ký</Text>
            <Image
              style={css.fx_1}
              resizeMode="contain"
              source={{
                uri: `data:image/jpeg;base64,${customerSignature}`,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={css.fx_1}>
          <Text style={styles.titleSignature}>Chữ ký cố vấn dịch vụ</Text>
          <TouchableOpacity
            style={styles.signatureConHanding}
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('SignatureQuotation', {
                type: 'advisor',
              });
            }}>
            <Text style={styles.txtCusSignature}>Cố vấn dịch vụ ký</Text>
            <Image
              style={css.fx_1}
              resizeMode="contain"
              source={{
                uri: `data:image/jpeg;base64,${advisorSignature}`,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default React.memo(CustomerTab);
