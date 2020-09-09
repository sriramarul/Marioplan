import React,{Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import {deleteProject} from '../../store/actions/projectAction'
import {NavLink} from 'react-router-dom'

class ProjectDetails extends Component{
    
    handleDelete = e => {
        const { id } = this.props;
        e.preventDefault();
        this.props.deleteProject(id);
        this.props.history.push('/');
}
    render(){
    const {project,auth} = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    if(project){
        return(
         <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{project.title}</span>
                    <p className="break-word">{project.content}</p>
                    {project.projectLink?(<p>Project Link: <a href={project.projectLink}>{project.projectLink}</a></p>):(null)}
                </div>
                <div className="row card-action lighten-4">
                    <div className="grey-text col s7">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>
                    {auth.uid.toString()===project.authorId?
                    <div>
                    <div className="col s2">
                    <NavLink to={{pathname:'/update/'+this.props.id,
                    state:{title:project.title,content:project.content,projectLink:project.projectLink}}} 
                    className="btn pink lighten-1 z-depth-0" >Update Project</NavLink>
                    </div>
                    <div className="col s2">
                    <button onClick={this.handleDelete}className="btn grey lighten-1 z-depth-0" >Delete Project</button>
                    </div>
                    </div>
                    :null}
                </div>
            </div>
        </div>)
    }else{
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
            )
    }
    
}}
const mapStateToProps = (state,ownProps) =>{
    const id=ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects?projects[id]:null
    return{
        project: project,
        auth:state.firebase.auth,
        id:id
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        deleteProject:(id)=>dispatch(deleteProject(id))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection:'projects'}
    ])
)(ProjectDetails)
