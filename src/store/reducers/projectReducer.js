const initState={
    projects:[
        {id:'1',title:'project 1',content:'project1 content'},
        {id:'2',title:'project 2', content:'project2 content'},
        {id :'3',title:'project 3',content:'project3 content'}
    ]
}

const projectReducer = (state=initState,action) =>{
 switch(action.type){
     case 'CREATE_PROJECT':
         return state;
     case 'CREATE_PROJECT_ERROR':
         return state;
    case 'DELETE_PROJECT':
        return state;
    case 'DELETE_PROJECT_ERROR':
        return state;
    case 'UPDATE_PROJECT':
        return state;
    case 'UPDATE_PROJECT_ERROR':
        return state;    
    default:
        return state;
 }
}

export default projectReducer;