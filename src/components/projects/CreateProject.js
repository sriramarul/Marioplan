import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/actions/projectAction'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
    state={
        title:'',
        content:'',
        projectLink:''
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit =(e)=>{
        e.preventDefault();
       this.props.createProject(this.state)
       this.props.history.push('/');
    }
    render() {
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darker-3">Create project</h5>
                    <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                    <label htmlFor="content">Project Content</label>
                    <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>
                    <div className="input-field">
                    <label htmlFor="projectLink">Project Link</label>
                    <textarea id="projectLink" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        auth:state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        createProject:(project) =>dispatch(createProject(project))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject)
