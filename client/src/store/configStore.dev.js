import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import Devtools from 'utils/DevTools'

const configureStore = preloadedState =>{
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk),
            Devtools.instrument()
        )
    )
    if(module.hot){
        //enable webpack hot module replacement for reducers
        module.hot.accept('../reducers', ()=>{
            store.replaceReducer(rootReducer)
        })
    }
    return store
}

export default configureStore