import moment from 'moment';

class Order {
  id: string;
  orderDetails: any;

  constructor(id: string, orderDetails: any) {
    this.id = id;
    this.orderDetails = orderDetails;
  }

  get readableDate() {
    return moment(this.orderDetails.dateRequested).format(
      'MMMM Do YYYY, h:mm a',
    );
  }
}

export default Order;
