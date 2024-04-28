import { Button, Col, Form, Modal, OverlayTrigger, Popover, Row, Table } from 'react-bootstrap'
import { addSegmentToStore, deleteSegmentInStore, storeSegments } from '../../store/SegmentStore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SegmentsScreen(){
    const { segments } = useSelector(state => state.segment);
    const [ showAddPop, setShowAddPop ] = useState(false);

    const [ addSegmentName, setAddSegmentName ] = useState("");
    const [ addSegmentDesc, setAddSegmentDesc ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        async function getSegments(){
            await axios.get('http://localhost:3001/admin/segments/get-segments').then((response)=>{
                dispatch(storeSegments(response.data.data))
            }).catch((err)=>{
            })
        }
        if(segments.length===0){
            getSegments();
        }
    },[segments, dispatch]);

    function gotoCategories(){
        navigate('/categories');
    }

    async function addSegment(){
        await axios.post('http://localhost:3001/admin/segments/create-segment', {
            name: addSegmentName,
            description: addSegmentDesc
        }).then((response)=>{
            dispatch(addSegmentToStore(response.data.data))
        }).catch((err)=>{
        })
    }
    function deleteSegment(id){
        dispatch(deleteSegmentInStore(id))
    }
    
    return(
        <Row>
            <Col>
            <Row className='my-4'>
                <Col lg={6}>
                    <h3>Manage Segment</h3>
                </Col>
                <Col lg={6}>
                    <Button onClick={()=>{gotoCategories()}} className='float-end' variant='secondary'>Go To Categories</Button>
                    <Button onClick={()=>{setShowAddPop(true)}} className='float-end me-2' variant='primary'>Add Segment</Button>
                </Col>
            </Row>
                <Row>
                    <Col lg={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Segment Name</th>
                                    <th>Segment Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {segments.map(item => {
                                    return <tr key={item._id}>
                                    <td>{item.segment_name}</td>
                                    <td>{item.segment_description}</td>
                                    <td>
                                        <OverlayTrigger
                                            trigger="click"
                                            placement='right'
                                            overlay={
                                            <Popover>
                                                <Popover.Header as="h3">Actions</Popover.Header>
                                                <Popover.Body>
                                                    <div className='px-4 py-1 fs-6 border-bottom border-1'><i class="bi bi-pencil-fill me-2 fs-6 text-primary"></i><span>Edit</span></div>
                                                    <div onClick={()=>{deleteSegment(item._id)}} className='px-4 py-1 fs-6'><i class="bi bi-trash3-fill me-2 fs-6 text-danger"></i><span>Delete</span></div>
                                                </Popover.Body>
                                            </Popover>
                                            }
                                        >
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal show={showAddPop} onHide={()=>{setShowAddPop(false)}}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Segment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Segment Name</Form.Label>
                                <Form.Control type="text" value={addSegmentName} onChange={(e)=> setAddSegmentName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Segment Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={addSegmentDesc} onChange={(e)=> setAddSegmentDesc(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{setShowAddPop(false)}}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>{addSegment()}}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
        
    )
}