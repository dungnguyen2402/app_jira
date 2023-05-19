// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { useState, useEffect } from 'react';
// import { Card } from 'antd';
// import { Link } from 'react-router-dom'
// import { useGetAllTaskQuery } from '../../pages/task/task.service';
// import {CheckOutlined,  PlusOutlined, ArrowDownOutlined } from '@ant-design/icons';
// const { Meta } = Card;


// const AppContext1 = () => {

//   const { data } = useGetAllTaskQuery()
//   //console.log(data);

//   const [filteredData, setFilteredData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   useEffect(() => {
//     if (data) {
//       setFilteredData(data.filter(item => item.status === 'BACKLOG 4' && item.name.match(new RegExp(searchText, 'gi'))));
//     }
//   }, [data, searchText])

//   const handleOnDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) {
//       return;
//     }
//     const items = Array.from(filteredData);
//     const [reorderedItem] = items.splice(source.index, 1);
//     items.splice(destination.index, 0, reorderedItem);

//     setFilteredData(items);
//   };

//   return (
//     <DragDropContext >
//       <div className='card-text'>
//         <h5>BACKLOG 4</h5>
//           <Droppable droppableId="characters">
//             {(provided) => (
//               <ul className='characters' {...provided.droppableProps} ref={provided.innerRef}>
//                 {filteredData.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id} index={index}>
//                     {(provided) => (
//                       <li
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         ref={provided.innerRef}
//                       >
//                         <Link to={`/task/${item.id}`}>
//                           <Card
//                             hoverable
//                             style={{
//                               width: 250,
//                               margin: '10px',
//                             }}
//                           >
//                             <Meta title={item.title} />
//                             <div className='card-text-icon'>
//                               <div>
//                                 <CheckOutlined style={{ color: 'white', fontSize: '12px', marginRight: '8px', backgroundColor: 'rgb(79, 173, 230)' }} />
//                                 <ArrowDownOutlined style={{ color: 'green' }} />
//                               </div>
//                               <div>
//                                 <Meta title={item.Assignees} />
//                               </div>
//                             </div>
//                           </Card>
//                         </Link>
//                       </li>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </ul>
//             )}
//           </Droppable>
//         <Card hoverable
//           style={{
//             width: 250,
//             margin: '10px'
//           }}> <PlusOutlined style={{ fontSize: '20px', color: 'black', paddingRight: '10px' }} /><Link to="/addtask">Thêm thẻ</Link>
//         </Card>

//       </div>
//       </DragDropContext>
//   )
//         }
// export default AppContext1

