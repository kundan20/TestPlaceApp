import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap'
import * as constants from './shared/Constants'
import * as master from './shared/MasterData'
import Modal from 'react-awesome-modal'

const Forms = (props) => {
    const [ formData, setFormData ] = useState({})
    const [ errorsData, setErrorsData ] = useState({})
    const [isList, setIsList ] = useState(props.isList)
    const [isItem, setIsItem ] = useState(props.isItem)
    console.log('props forms-', props)

    const setValue = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
        if(!!errorsData[e.target.name]) {
            setErrorsData({
                ...errorsData,
                [e.target.name] : null
            })
        }
    }
    const closeModal = () => {
        setIsList(false)
        setIsItem(false)
    }
    const errorFormsHandler = () => {
        const { title, desc } = formData
        const errorsObj = {}        
        if ( !title || title === '' ) errorsObj.title = 'Title ' + constants.CANT_BLANK
        if ( !desc || desc === '' ) errorsObj.desc = 'Description ' + constants.CANT_BLANK
        return errorsObj
    }

    
    const formHandler = (e) => {
        e.preventDefault()
        console.log('formHandler .........', e)

        const errorsObj = errorFormsHandler()
        if(Object.keys(errorsObj).length > 0) {
         setErrorsData(errorsObj)
        } else {
            let initialData = JSON.parse(localStorage.getItem('initialData'))
            let l = initialData.columnOrder.length
            let lastColInd = initialData.columnOrder[l-1]
            console.log('lastColInd', lastColInd)
 
        }
    }
    console.log('isList type ', typeof isList)

    return (
         
        <Modal visible={ isList || isItem } width="400" height= {`350`} effect="fadeInUp" >
        <div className = "forms">
            <Row>
                <Col className = "text-center mb-4">
                    <h4>{isList ? 'Add List' : 'Add Items'}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit = {formHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter title" 
                                name = "title" 
                                value = {formData.title} 
                                onChange = {setValue} 
                                isInvalid = {!!errorsData.title}
                            />
                            <Form.Control.Feedback type='invalid' >
                                { errorsData.title }
                            </Form.Control.Feedback>                            
                        </Form.Group>
                        {isItem &&
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter description" 
                                    name = "desc" 
                                    value = {formData.desc} 
                                    onChange = {setValue} 
                                    isInvalid = {!!errorsData.desc}
                                />
                                <Form.Control.Feedback type='invalid' >
                                    { errorsData.desc }
                                </Form.Control.Feedback>                                                                  
                            </Form.Group>
                        }
                        <div className = "text-center mt-4">
                            <Button className = "trello-btn " type="submit">
                                Submit
                            </Button>
                            <Button className = "trello-btn cancel" onClick = {closeModal}>
                                Cancel
                            </Button>
                        </div>
                    
                    </Form>

                </Col>
            </Row>
        </div>
    </Modal>

    )
}

export default Forms
