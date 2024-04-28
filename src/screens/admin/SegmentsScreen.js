import { Button, Col, Form, Modal, OverlayTrigger, Popover, Row, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import axios from 'axios';

export default function SegmentsScreen(){
    const [ segments, setSegments ] = useState([]);
    const [ showAddPop, setShowAddPop ] = useState(false)
    useEffect(()=>{
        async function getSegments(){
            await axios.get('http://localhost:3001/admin/segments/get-segments').then((response)=>{
                setSegments(response.data.data);
            }).catch((err)=>{
            })
        }
        if(segments.length===0){
            getSegments();
        }
    },[segments]);

    return(
        <Row>
            <Col>
            <Row className='my-4'>
                <Col lg={6}>
                    <h3>Manage Segment</h3>
                </Col>
                <Col lg={6}>
                    <Button onClick={()=>{setShowAddPop(true)}} className='float-end' variant='primary'>Add Segment</Button>
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
                                                    <div className='px-4 py-1 fs-6'><i class="bi bi-trash3-fill me-2 fs-6 text-danger"></i><span>Delete</span></div>
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
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Segment Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{setShowAddPop(false)}}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>{setShowAddPop(false)}}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
        
    )
}