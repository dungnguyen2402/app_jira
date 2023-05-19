const { Sider } = Layout;
import { LogoSideNav } from '../../layout/LogoSideNav';
import { useGetAllProjectQuery } from '../../pages/project/project.service';
import { Layout, theme } from 'antd'
import { SettingOutlined, CreditCardOutlined, HomeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'




function AppNav() {

  const project = useGetAllProjectQuery()
  const currentProject = project.data
  //console.log({ currentProject });

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Sider
      width={200}
      style={{
        background: colorBgContainer,
        paddingLeft: '76px'
      }}
    >
      <div className='logo'>
        <div><LogoSideNav /></div>

        {currentProject && currentProject.length > 0 ? (
          <div className='logo_nav_text'>
            <h5 className='logo_nav' style={{ display: 'inline-block' }}>{currentProject[currentProject.length - 1].name}</h5>
            <p style={{ display: 'inline-block', margin: '0' }}>Business project</p>
          </div>
        ) : (
          <div className='logo_nav_text'>
            <h5 className='logo_nav' style={{ display: 'inline-block' }}>Loading...</h5>
            <p style={{ display: 'inline-block', margin: '0' }}>Business project</p>
          </div>
        )}

      </div>
      <div>
        <ul style={{
          width: '200px',
          height: '100vh',
          fontSize: '15px',
          paddingLeft: '8px',
          backgroundColor: 'rgb(244, 245, 247)'
        }}>
          {currentProject && currentProject.length > 0 ? (
            <div >
              <HomeOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to="/">Kanban Board</Link><br />
              <SettingOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to={`/project/${currentProject[currentProject.length - 1].id}`}>Project Setting</Link><br />
              <CreditCardOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to="/issue-and-filters">Issure and filters</Link><br />
              <PlusOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to="/addtask">Add Issure</Link><br />
              <SearchOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to="/search-issue">Search Issure</Link>
            </div>
          ) : (
            <div >
              <HomeOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to="/">Kanban Board</Link><br />
              <SettingOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to={`/project/Loading`}>Project Setting</Link><br />
              <CreditCardOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to="/issue-and-filters">Issure and filters</Link><br />
              <PlusOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to="/addtask">Add Issure</Link><br />
              <SearchOutlined style={{ fontSize: '24px', padding: 10, color: 'black' }} /><Link style={{ textDecoration: 'none', color: 'black', fontSize: '17px' }} to="/search-issue">Search Issure</Link>
            </div>
          )
          }
        </ul>
      </div>

    </Sider>
  )
}
export default AppNav