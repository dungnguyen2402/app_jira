import { Link } from 'react-router-dom'
import {  PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
import { LogoMenu } from '../../layout/LogoMenu';


function AppSider() {
    return (
        <div className='sider_text'>
        <div className='logomenu'><LogoMenu /></div>
        <Link to="/project" className='list__content'>
          <div className='list__item'>
            <AppstoreOutlined className="list_icon" style={{ fontSize: '24px', color: 'white', padding: '4px' }} />
            <div className="list_content">PROJECT</div>
          </div>
        </Link>
        <Link to="/addproject" className='list__content'>
          <div className='list__item'>
            <PlusOutlined style={{ fontSize: '24px', color: 'white', padding: '4px' }} />
            <div className="list_content">ADD PROJECT</div>
          </div>
        </Link>
      </div>
    )
}

export default AppSider