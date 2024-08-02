import "./MyOrderPage.css";
import Table from "../Common/Table";
import useData from "../../Hook/useData";

const MyOrderPage = () => {
  const { data: orders, error, isLoading } = useData("/order");
  const getProductString = (order) => {
    const productStringArr = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );
    return productStringArr.join(", ");
  };

  return (
    <section className="align_center myorder_page">
      <Table headings={["내주문", "상품들", "결제금액", "배송상태"]}>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{getProductString(order)}</td>
              <td>{order.total.toLocaleString("ko-KR")} 원</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrderPage;
