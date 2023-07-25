import React, {forwardRef, useImperativeHandle} from 'react';
import normalize from 'react-native-normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  Colors,
  FontFamily,
  FontSizeNormalize,
  SCREEN_WIDTH,
} from '@styles/index';
import {showMessage} from '@common/index';
import {num2numDong} from '@services/utils';
import {PUT} from '@repository/quotation/index';
import {LineInput} from '@components/forms/index';
import {LocalizationContext} from '@context/index';
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
  // setCustomerSignature,
  // setAdvisorSignature,
} from '@stores/appointment/actions';
import {setLoading} from '@stores/config/actions';

const ServiceInformationTab = (props, ref) => {
  const {t} = React.useContext(LocalizationContext);
  const {accessToken} = useSelector((st) => st.auth);
  const dispatch = useDispatch();
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
  } = useSelector((st) => st.appointment);
  const requestIds = props?.data?.request_type_name;

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
          ) +
          props?.data?.surcharge_ids?.surcharge_ids
            .filter(function (surcharge) {
              return surcharge.name !== 'Miễn thường';
            })
            .reduce(
              (previousValue, currentValue) =>
                previousValue +
                currentValue.price_unit *
                  (parseFloat(currentValue.tax_id.replace('%')) / 100),
              0,
            ),
      ),
    );
    dispatch(
      setAmountInsurance(
        serviceMaterial.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.record.x_amount_insurance_total,
          0,
        ) +
          serviceLabor.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.record.x_amount_insurance_total,
            0,
          ) -
          props?.data?.surcharge_ids?.surcharge_ids
            .filter(function (surcharge) {
              return surcharge.name === 'Miễn thường';
            })
            .reduce(
              (previousValue, currentValue) =>
                previousValue +
                currentValue.price_unit *
                  (parseFloat(currentValue.tax_id.replace('%')) / 100 + 1),
              0,
            ),
      ),
    );
    dispatch(
      setAmountInternal(
        serviceLabor
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
            ),
      ),
    );
    dispatch(
      setAmountCustomerTotal(
        totalAmount -
          amountInsurance -
          amountInternal -
          props?.data?.amount_reduce_total +
          props?.data?.amount_surcharge_total,
      ),
    );
  }, [
    amountInsurance,
    amountInternal,
    dispatch,
    props,
    serviceLabor,
    serviceMaterial,
    totalAmount,
  ]);

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

  const onChangeQtyLabor = (quantity, index) => {
    let qty = quantity === '' ? '0' : quantity;
    let newList = [...serviceLabor];
    let discount =
      newList[index]?.record?.discount === ''
        ? 0
        : newList[index]?.record?.discount;
    let tax_id = parseFloat(newList[index]?.record?.tax_id?.replace('%'));
    newList[index].record.product_uom_qty = qty;
    serviceLabor[index].record.guarantee_check === 'no'
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
    serviceMaterial[index].record.guarantee_check === 'no'
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

  useImperativeHandle(ref, () => ({
    onUpdate() {
      const params = {
        access_token: accessToken,
        quotation_id: props?.data.id,
        request_type_ids: props?.data?.request_type_ids,
        sale_order_lines: serviceLabor
          .map(function (x) {
            return {
              id: x.id,
              record: {
                product_id: x.record.product_id,
                name: x.record.name,
                task_type_id: x.record.task_type_id,
                price_unit: x.record.price_unit,
                product_uom_qty: parseFloat(x.record.product_uom_qty),
                product_uom: x.record.product_uom,
                x_total_undiscount: x.record.x_total_undiscount,
                discount: x.record.discount,
                price_subtotal: x.record.price_subtotal,
                tax_id: x.record.tax_id,
                price_tax: x.record.price_tax,
                price_total: x.record.price_total,
                guarantee_check: x.record.guarantee_check,
                x_internal_check: x.record.x_internal_check,
                x_insurance_percent: x.record.x_insurance_percent,
                x_insurance_price: x.record.x_insurance_price,
                x_amount_insurance_total: x.record.x_amount_insurance_total,
                x_service_type: 'labor',
              },
            };
          })
          .concat(
            serviceMaterial.map(function (x) {
              return {
                id: x.id,
                record: {
                  product_id: x.record.product_id,
                  name: x.record.name,
                  task_type_id: x.record.task_type_id,
                  price_unit: x.record.price_unit,
                  product_uom_qty: parseFloat(x.record.product_uom_qty),
                  product_uom: x.record.product_uom,
                  x_total_undiscount: x.record.x_total_undiscount,
                  discount: x.record.discount,
                  price_subtotal: x.record.price_subtotal,
                  tax_id: x.record.tax_id,
                  price_tax: x.record.price_tax,
                  price_total: x.record.price_total,
                  guarantee_check: x.record.guarantee_check,
                  x_internal_check: x.record.x_internal_check,
                  x_insurance_percent: x.record.x_insurance_percent,
                  x_insurance_price: x.record.x_insurance_price,
                  x_amount_insurance_total: x.record.x_amount_insurance_total,
                  x_service_type: 'material',
                },
              };
            }),
          ),
      };
      PUT.updateQuotation(params)
        .then((res) => {
          dispatch(setLoading(false));
          showMessage('Sửa báo giá thành công!');
          // dispatch(setCustomerSignature(''));
          // dispatch(setAdvisorSignature(''));
          props._getDetailQuotation();
          props.setIsEdit(false);
        })
        .catch((err) => {
          props._getDetailQuotation();
          dispatch(setLoading(false));
          showMessage(err);
          // console.log(err);
        });
    },
  }));

  const renderEmptyItem = () => {
    return <Text style={styles.noData}>Không có dữ liệu!</Text>;
  };

  const renderHeaderWork = () => {
    return (
      <View style={styles.titleHeader}>
        <Text style={styles.txt(Colors.white, 3, 'center')}>Tên công việc</Text>
        <Text style={styles.txt(Colors.white, 3, 'center')}>Mô tả</Text>
        <Text style={styles.txt(Colors.white, 1, 'center')}>
          Loại công việc
        </Text>
        {requestIds?.includes('Bảo hành') && (
          <Text style={styles.txt(Colors.white, 1, 'center')}>Bảo hành</Text>
        )}
        {requestIds?.includes('Sửa chữa nội bộ') && (
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
        {requestIds?.includes('Sửa chữa bảo hiểm') && (
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

  const renderItemWork = ({item, index}) => {
    return (
      <View style={styles.titleItem(index)}>
        <Text style={styles.txt(Colors.black, 3)}>
          {item.record.product_name}
        </Text>
        <Text style={styles.txt(Colors.black, 3)}>{item.record.name}</Text>
        <Text style={styles.txt(Colors.black, 1, 'center')}>
          {item.record.task_type_name}
        </Text>
        {requestIds?.includes('Bảo hành') && (
          <Text style={styles.txt(Colors.black, 1, 'center')}>
            {t(item.record.guarantee_check)}
          </Text>
        )}
        {requestIds?.includes('Sửa chữa nội bộ') && (
          <Text style={styles.txt(Colors.black, 1, 'center')}>
            {t(item.record.x_internal_check)}
          </Text>
        )}
        <Text style={styles.txt(Colors.black, 1, 'center')}>
          {item.record.product_uom_name}
        </Text>
        {props?.isEdit && item.record.product_name !== 'KM' ? (
          <View style={styles.textInput(1)}>
            <TextInput
              style={styles.input(1)}
              onChangeText={(quantity) => {
                onChangeQtyLabor(quantity, index);
              }}
              clearTextOnFocus={false}
              value={item.record.product_uom_qty.toString()}
              keyboardType={'numeric'}
              placeholder="0"
              multiline={true}
            />
          </View>
        ) : (
          <Text style={styles.txt(Colors.black, 1, 'right')}>
            {item.record.product_uom_qty}
          </Text>
        )}
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
        {requestIds?.includes('Sửa chữa bảo hiểm') && (
          <>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {item.record.x_insurance_percent}
            </Text>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {num2numDong(item.record.x_insurance_price)}
            </Text>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {num2numDong(item.record.x_amount_insurance_total)}
            </Text>
          </>
        )}
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => onRemoveLabor(index)}>
          {props?.isEdit && (
            <AntDesign name="delete" color={Colors.black} size={20} />
          )}
        </TouchableOpacity>
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
        {requestIds?.includes('Bảo hành') && (
          <Text style={styles.txt(Colors.white, 1, 'center')}>Bảo hành</Text>
        )}
        {requestIds?.includes('Sửa chữa nội bộ') && (
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
        {requestIds?.includes('Sửa chữa bảo hiểm') && (
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

  const renderItemSpare = ({item, index}) => {
    return (
      <View style={styles.titleItem(index)}>
        <Text style={styles.txt(Colors.black, 2.15)}>{item.record.name}</Text>
        <Text style={styles.txt(Colors.black, 1, 'center')}>
          {item.record.task_type_name}
        </Text>
        <Text style={styles.txt(Colors.black, 1, 'center')}>
          {item.record.product_uom_name}
        </Text>
        {requestIds?.includes('Bảo hành') && (
          <Text style={styles.txt(Colors.black, 1, 'center')}>
            {t(item.record.guarantee_check)}
          </Text>
        )}
        {requestIds?.includes('Sửa chữa nội bộ') && (
          <Text style={styles.txt(Colors.black, 1, 'center')}>
            {t(item.record.x_internal_check)}
          </Text>
        )}
        {props?.isEdit ? (
          <TextInput
            style={styles.input(1)}
            onChangeText={(quantity) => {
              onChangeQtyMaterial(quantity, index);
            }}
            clearTextOnFocus={false}
            value={item.record.product_uom_qty.toString()}
            keyboardType={'numeric'}
            multiline={true}
            placeholder="0"
          />
        ) : (
          <Text style={styles.txt(Colors.black, 1, 'right')}>
            {item.record.product_uom_qty}
          </Text>
        )}
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
        {requestIds?.includes('Sửa chữa bảo hiểm') && (
          <>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {item.record.x_insurance_percent}
            </Text>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {num2numDong(item.record.x_insurance_price)}
            </Text>
            <Text style={styles.txt(Colors.black, 1.5, 'right')}>
              {num2numDong(item.record.x_amount_insurance_total)}
            </Text>
          </>
        )}
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => onRemoveMaterial(index)}>
          {props?.isEdit && (
            <AntDesign name="delete" color={Colors.black} size={20} />
          )}
        </TouchableOpacity>
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

  const renderItemSurcharge = ({item, index}) => {
    return (
      <View style={styles.titleItem(index)}>
        <Text style={styles.txt(Colors.black, 2.5, 'center')}>{item.name}</Text>
        <Text style={styles.txt(Colors.black, 2.5, 'center')}>{item.name}</Text>
        <Text style={styles.txt(Colors.black, 2.5, 'center')}>
          {num2numDong(item.price_unit)}
        </Text>
        <Text style={styles.txt(Colors.black, 2.5, 'center')}>
          {item.tax_id}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LineInput
        leftTitle={'Gói dịch vụ'}
        rightTitle={'Đặt cọc BO'}
        leftValue={
          props?.data?.car_service_ids === []
            ? ''
            : props?.data?.car_service_ids || ''
        }
        rightValue={
          props?.data?.order_deposit_id === 0
            ? ''
            : props?.data?.order_deposit_id || ''
        }
        leftUpperCase={true}
        disabled={true}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>Lí do không sử dụng gói</Text>
        <View style={styles.cityCon(true)}>
          <Text style={styles.txtAddress}>
            {props?.data?.x_reason_not_use_service}
          </Text>
        </View>
        <View style={styles.model} />
        <View style={styles.none} />
      </View>
      <View style={styles.title}>
        <Text style={styles.txtTitle}>Phần công việc</Text>
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
      <View style={styles.title}>
        <Text style={styles.txtTitle}>
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
        <Text style={styles.txtMoney}>Giảm giá: {props?.data?.x_discount}</Text>
        <Text style={styles.txtMoney}>
          Tổng chi phí trước giảm giá trước thuế:{' '}
          {num2numDong(totalAmountUndiscount)}
        </Text>
        <Text style={styles.txtMoney}>
          Tổng chi phí sau giảm giá sau thuế: {num2numDong(totalAmount)}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.txtTitle}>Phụ thu</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={props?.data?.surcharge_ids?.surcharge_ids}
          ListHeaderComponent={renderHeaderSurcharge()}
          renderItem={renderItemSurcharge}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyItem}
        />
      </ScrollView>
      <Text style={styles.txtMoney}>
        Tổng tiền giảm giá: {num2numDong(amountDiscount)}
      </Text>
      <Text style={styles.txtMoney}>
        Tổng tiền giảm giá CTKM: {num2numDong(props?.data?.x_amount_promotion)}
      </Text>
      <Text style={styles.txtMoney}>Thuế: {num2numDong(amountTax)}</Text>
      <Text style={styles.txtMoney}>
        Tổng tiền phụ phí: {num2numDong(props?.data?.amount_surcharge_total)}
      </Text>
      <Text style={styles.txtMoney}>
        Tổng tiền giảm trừ: {num2numDong(props?.data?.amount_reduce_total)}
      </Text>
      <Text style={styles.txtMoney}>
        Tổng tiền bảo hiểm: {num2numDong(amountInsurance)}
      </Text>
      <Text style={styles.txtMoney}>
        Tổng tiền nội bộ: {num2numDong(amountInternal)}
      </Text>
      <Text style={styles.txtMoney}>
        Tổng tiền khách hàng: {num2numDong(amountCustomerTotal)}
      </Text>
      <View style={styles.title} />
    </ScrollView>
  );
};
export default forwardRef(ServiceInformationTab);

const styles = StyleSheet.create({
  container: {width: SCREEN_WIDTH, flex: 1, padding: 10},
  scrollView: {flex: 1},
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(5),
  },
  txtTitle: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  titleHeader: {
    backgroundColor: Colors.main,
    flexDirection: 'row',
  },
  titleItem: (index) => ({
    flexDirection: 'row',
    backgroundColor: index % 2 === 0 ? '#d1cfcf' : '#f7f7f7',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  }),
  txtMoney: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    marginTop: normalize(6),
    color: '#219404',
    alignSelf: 'flex-end',
    marginRight: normalize(5),
  },
  noData: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    marginLeft: normalize(170),
    marginTop: normalize(5),
  },
  txt: (color, flex, textAlign) => ({
    width: (SCREEN_WIDTH / 10) * flex,
    borderRightWidth: 0.5,
    borderRightColor: Colors.white,
    color: color,
    textAlign: textAlign,
    textAlignVertical: 'center',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    padding: 5,
    minHeight: normalize(15),
  }),
  addressCon: {flexDirection: 'row', marginVertical: 10},
  leftTitle: {
    paddingVertical: 10,
    flex: 0.7,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  cityCon: (disabled) => ({
    flex: 1,
    height: 40,
    borderColor: disabled ? Colors.gray : Colors.txtGray,
    borderRadius: 5,
    borderWidth: 0.5,
    justifyContent: 'center',
    backgroundColor: disabled ? Colors.gray : Colors.white,
  }),
  txtAddress: {
    marginHorizontal: 10,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.black,
  },
  model: {
    borderColor: Colors.txtGray,
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 10,
  },
  none: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  deleteIcon: {
    width: (SCREEN_WIDTH / 10) * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: (flex) => ({
    width: (SCREEN_WIDTH / 10) * flex,
    height: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  }),
  input: (flex) => ({
    width: (SCREEN_WIDTH / 10) * flex,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.black,
    textAlign: 'right',
    textAlignVertical: 'center',
  }),
  txtInput: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.black,
  },
});
