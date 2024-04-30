import { Button, Col, Form, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, OverlayTrigger, Popover, Row, Table } from 'react-bootstrap'
import { addSegmentToStore, deleteSegmentInStore, editSegmentInStore, storeSegments } from '../../store/SegmentStore';
import { deleteRequest, getRequest, postRequest } from '../../utils/ApiUtils';
import { setLoading, setPageMessage } from '../../store/AppStore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { ApiConstants } from '../../constants/ApiConstants';
import { useNavigate } from 'react-router-dom';

export default function SegmentsScreen(){
    const { segments } = useSelector(state => state.segment);
    
    const [ showAddPop, setShowAddPop ] = useState(false);
    const [ showEditPop, setShowEditPop ] = useState(false);
    const [ showDeletePop, setShowDeletePop ] = useState(false);

    const [ addSegmentName, setAddSegmentName ] = useState("");
    const [ addSegmentDesc, setAddSegmentDesc ] = useState("");

    const [ selectedRecord, setSelectedRecord ] = useState(null); 
    const [ editSegmentName, setEditSegmentName] = useState("");
    const [ editSegmentDesc, setEditSegmentDesc] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        async function getSegments(){
            dispatch(setLoading(true));
            const response= await getRequest(ApiConstants.backendBaseUrl+ApiConstants.getSegments);
            if(response.isError){
                dispatch(setPageMessage({show: true, message: response.message, variant: "danger"}));
                dispatch(setLoading(false));
            }else{
                dispatch(setPageMessage({show: true, message: response.message, variant: "success"}))
                dispatch(storeSegments(response.data));
                dispatch(setLoading(false));
            }
        }
        if(segments.length===0){
            getSegments();
        }
    },[segments, dispatch]);

    function gotoCategories(){
        navigate('/categories');
    }

    async function addSegment(){
        const response= await postRequest(ApiConstants.backendBaseUrl+ApiConstants.createSegment, {
            name: addSegmentName,
            description: addSegmentDesc
        })
        console.log(response)
        if(response.isError){
            dispatch(setPageMessage({show: true, message: response.message, variant: "danger"}))
        }else{
            dispatch(setPageMessage({show: true, message: response.message, variant: "success"}))
            dispatch(addSegmentToStore(response.data));
            setAddSegmentName(""); setAddSegmentDesc(""); setShowAddPop(false);
        }
    }
    async function deleteSegment(){
        const response= await deleteRequest(ApiConstants.backendBaseUrl+ApiConstants.deleteSegment,selectedRecord._id);
        if(response.isError){
            dispatch(setPageMessage({show: true, message: response.message, variant: "danger"}))
        }else{
            dispatch(setPageMessage({show: true, message: response.message, variant: "success"}))
            dispatch(deleteSegmentInStore(selectedRecord._id));
            setSelectedRecord(null); setShowDeletePop(false);
        }
    }
    async function editSegment(){
        let request= {}
        if(selectedRecord.segment_name === editSegmentName){
            request={
                id: selectedRecord._id,
                description: editSegmentDesc
            }
        }else if(selectedRecord.segment_description === editSegmentDesc){
            request={
                id: selectedRecord._id,
                name: editSegmentName
            }
        }else{
            request={
                id: selectedRecord._id,
                name: editSegmentName,
                description: editSegmentDesc
            }
        }
        const response= await postRequest(ApiConstants.backendBaseUrl+ApiConstants.updateSegment, request)
        if(response.isError){
            dispatch(setPageMessage({show: true, message: response.message, variant: "danger"}))
        }else{
            dispatch(setPageMessage({show: true, message: response.message, variant: "success"}))
            dispatch(editSegmentInStore(response.data));
            setEditSegmentName(""); setEditSegmentDesc(""); setSelectedRecord(null); setShowEditPop(false);
        }
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
                                        rootClose
                                        overlay={
                                        <Popover>
                                            <Popover.Header as="h3">Actions</Popover.Header>
                                            <Popover.Body>
                                                <div role="button" onClick={()=>{setShowEditPop(true); setEditSegmentName(item.segment_name); setEditSegmentDesc(item.segment_description); setSelectedRecord(item)}} className='px-4 py-1 fs-6 border-bottom border-1'><i className="bi bi-pencil-fill me-2 fs-6 text-primary"></i><span>Edit</span></div>
                                                <div role="button" onClick={()=>{setShowDeletePop(true); setSelectedRecord(item)}} className='px-4 py-1 fs-6'><i className="bi bi-trash3-fill me-2 fs-6 text-danger"></i><span>Delete</span></div>
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                        <i className="bi bi-three-dots-vertical"></i>
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
            <Modal show={showEditPop} onHide={()=>setShowEditPop(false)}>
                <ModalHeader closeButton>
                        <ModalTitle> Edit Segment</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group className='editname'>
                            <FormLabel> Segment Name</FormLabel>
                            <Form.Control type="text" value={editSegmentName} onChange={(e)=> setEditSegmentName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='editname'>
                            <FormLabel> Segment Desc</FormLabel>
                            <Form.Control as="textarea" rows={3} value={editSegmentDesc} onChange={(e)=> setEditSegmentDesc(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant='secondary' onClick={()=>setShowEditPop(false)}>Close</Button>
                    <Button variant='primary' onClick={()=>editSegment()}>Save Changes</Button>
                </ModalFooter>

            </Modal>
            <Modal show={showDeletePop} onHide={()=>setShowDeletePop(false)}>
                <ModalHeader closeButton>
                        <ModalTitle>Delete Segment</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this Segment?
                </ModalBody>
                <ModalFooter>
                    <Button variant='secondary' onClick={()=>setShowDeletePop(false)}>Close</Button>
                    <Button variant='primary' onClick={()=>deleteSegment()}>Delete</Button>
                </ModalFooter>
            </Modal>   
        </Col>
        </Row>
        
    )
}