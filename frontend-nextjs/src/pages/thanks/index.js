import { Button, Result } from 'antd';
import Link from "next/link"

const App = () => (
    <Result
        status="success"
        title="Congratulations on your successful order. Thank you for choosing our products💚"
        extra={[
            <Button style={{ backgroundColor: "#06BF00 ", color: "white", height: '45px', width: '200px' }} key="console">
                <Link href="/products">Continue shopping</Link>
            </Button>,
        ]}
    />
);
export default App;