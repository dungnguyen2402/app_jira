import { useDeletePostMutation, useGetAllProjectQuery } from './project.service'
import { Row , Card, Button , Col } from 'antd';
import { Typography } from 'antd';
import parse from 'html-react-parser'

const { Title, Text } = Typography;


type Props = {}

const ListProject = (props: Props) => {
    const {data} = useGetAllProjectQuery()
    console.log({data})

    const [deleteProject] = useDeletePostMutation()

    const handleDelete = (id: any) => {
      deleteProject(id)
    };
    return (
      
    
      <Row gutter={[16, 16]}>
      {data?.map((projects: any) => (
        <Col span={6} key={projects.id}>
          <Card hoverable>
            <Title level={3}>{projects.name}</Title>
            <Text>{projects.url}</Text>
            <Text>{parse(projects.description)}</Text> <br />
            <Button type="primary" danger style={{margin: '10px 0'}} onClick={() => handleDelete(projects.id)}>Delete</Button>
          </Card>
        </Col>
      ))}
    </Row>
        )
      }
export default ListProject