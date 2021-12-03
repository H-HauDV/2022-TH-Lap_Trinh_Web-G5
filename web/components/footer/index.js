
import { Row, Layout, Col, Dropdown, Avatar } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered, faCopyright, faUserLock, faEnvelope} from '@fortawesome/free-solid-svg-icons'
const {  Footer } = Layout;

function FooterComponent() {

    return (
        <Footer style={{ textAlign: 'center', backgroundColor: "#343a40", color: "#fff"}}>
            <Row style={{ marginTop: 30, marginBottom: 30 }}>
                <Col offset={6} span={12}>
                Nội dung trên website đều là sưu tầm trên internet hoặc do các thành viên đóng góp. 
                Nếu có bất kỳ khiếu nại nào liên quan đến vấn đề quản quyền tác giả hãy liên lạc cho chúng tôi, 
                chúng tôi sẽ gỡ nó xuống sớm nhất có thể.
                </Col>
                
            </Row>
            <Row >
                <Col offset={4}  span={4}>
                    <FontAwesomeIcon icon={faRegistered} />&nbsp;Điều khoản 
                </Col>
                <Col span={4}>
                    <FontAwesomeIcon icon={faCopyright} />&nbsp;Bản quyền
                </Col>
                <Col span={4}>
                    <FontAwesomeIcon icon={faUserLock} />&nbsp;Bảo mật
                </Col>
                <Col span={4}>
                    <FontAwesomeIcon icon={faEnvelope} />&nbsp;Liên hệ
                </Col>
            </Row>
        </Footer>
    );

}
export default FooterComponent;
