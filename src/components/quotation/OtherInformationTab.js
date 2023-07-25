import React from 'react';
import {ScrollView} from 'react-native';
import {tableCheckOrderStyles as styles} from '@styles/index';
import {formatDate} from '@services/utils';
import {LineInput} from '@components/forms/index';

const ServiceInformationTab = ({data}) => {
  return (
    <ScrollView style={styles.container}>
      <LineInput
        leftTitle={'Công ty'}
        rightTitle={'Đại lý'}
        leftValue={data?.company || ''}
        rightValue={data?.branch || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Kho'}
        rightTitle={'Bảng giá'}
        leftValue={data?.warehour_id || ''}
        rightValue={data?.pricelist_id || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Ngày giao xe'}
        rightTitle={'Cố vấn dịch vụ'}
        leftValue={
          data?.date_delivery === 'False'
            ? ''
            : formatDate(data?.date_delivery || ' ')
        }
        rightValue={data?.adviser?.name || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Hóa đơn khách hàng'}
        rightTitle={'Xuất bán kho'}
        leftValue={data?.invoice_customer_id || ''}
        rightValue={data?.x_picking_settlement_id || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Hóa đơn bảo hiểm'}
        rightTitle={'Hóa đơn bảo hành'}
        leftValue={data?.invoice_insurance_id || ''}
        rightValue={data?.invoice_guarantee_id || ''}
        leftUpperCase={true}
        disabled={true}
      />
    </ScrollView>
  );
};
export default React.memo(ServiceInformationTab);
