import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateProject} from '../../store/actions/projectAction'
import { Redirect } from 'react-router-dom'


class UpdateProject extends Component {
    state={
        title:this.props.location.state.title,
        content:this.props.location.state.content,
        projectLink:this.props.location.state.projectLink
    }
    c
    handleChange = (e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit =(e)=>{
        e.preventDefault();
        const id=this.props.match.params.id;
        const projectDetails={
            project:this.state,
            id:id
        }
       this.props.updateProject(projectDetails);
       this.props.history.push('/project/'+id);
    }
    render() {
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darker-3">Update project</h5>
                    <div className="input-field">
                    <label className="active"  htmlFor="title">Title</label>
                    <input type="text" id="title"  value={this.state.title} onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                    <label className="active" htmlFor="content">Project Content</label>
                    <textarea id="content" className="materialize-textarea" value={this.state.content} onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                    <label className="active" htmlFor="projectLink">Project Link</label>
                    <textarea id="projectLink" className="materialize-textarea" value={this.state.projectLink} onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Update</button>
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
        updateProject:(projectDetails) =>dispatch(updateProject(projectDetails))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProject)
