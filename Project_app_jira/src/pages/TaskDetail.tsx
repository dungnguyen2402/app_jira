import React from 'react'
import { useGetOneTaskQuery } from './task/task.service'
import { useParams} from 'react-router-dom'

type Props = {}

const TaskDetail = (props: Props) => {
    const { id } = useParams<{ id: any }>()
    const {data} = useGetOneTaskQuery(id)
    console.log(data);
    

  return (
    <div className='taskdetail'>
        <div>
            <h2>{data.name}</h2>
            <h3>{data.title}</h3>
            <h5>{data.description}</h5>
        </div>
        <div>
            <h5>STATUS</h5>
            <p>{data.status}</p>
            <h5>ASSIGNEES</h5>
            <p>{data.assignees}</p>
            <h5>PRIORITY</h5>
            
        </div>
    </div>
  )
}

export default TaskDetail