import backpressure from 'rijs.backpressure'
import components from 'rijs.components'
import versioned from 'rijs.versioned'
import singleton from 'rijs.singleton'
import sessions from 'rijs.sessions'
import features from 'rijs.features'
import offline from 'rijs.offline'
import helpers from 'rijs.helpers'
import precss from 'rijs.precss'
import resdir from 'rijs.resdir'
import serve from 'rijs.serve'
import pages from 'rijs.pages'
import redis from 'rijs.redis'
import needs from 'rijs.needs'
import sync from 'rijs.sync'
import core from 'rijs.core'
import data from 'rijs.data'
import css from 'rijs.css'
import fn from 'rijs.fn'
import client from 'utilise/client'

client && !window.ripple && create()

export default function create(opts){
  var ripple = core()    // empty base collection of resources
 
  // enrich..
  singleton(ripple)      // exposes a single instance
  data(ripple)           // register data types
  css(ripple)            // register css types
  fn(ripple)             // register fn types
  helpers(ripple)        // expose helper functions and constants
  redis(ripple, opts)    // add redis cache
  components(ripple)     // invoke web components, fn.call(<el>, data)
  needs(ripple)          // define default attrs for components
  precss(ripple)         // preapplies scoped css 
  serve(ripple, opts)    // serve client libraries
  pages(ripple, opts)    // serve pages directory
  offline(ripple)        // loads/saves from/to localstorage
  sync(ripple, opts)     // syncs resources between server/client
  backpressure(ripple)   // restricts broadcast to clients based on need
  features(ripple)       // extend components with features
  versioned(ripple)      // versioning info and time travel
  sessions(ripple, opts) // populates sessionid on each connection
  resdir(ripple, opts)   // loads from resources folder

  return ripple
}
