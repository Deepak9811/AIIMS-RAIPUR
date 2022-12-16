## AIIMS RAIPUR 

- Mobile application android

#### if get error Invariant Violation: ViewPropTypes has been removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'

1. Install patch-package(npm i patch-package), this will later be used to make the changes more persistent.

2. Install deprecated-react-native-prop-types by running npm install deprecated-react-native-prop-types or yarn add deprecated-react-native-prop-types

3. Now you have to hack the node_modules. Go to node_modules/react-native/index.js starting around line 436 and change this:

   // Deprecated Prop Types
      get ColorPropType(): $FlowFixMe {
      invariant(
      false,
      "ColorPropType has been removed from React Native. Migrate to " +
      "ColorPropType exported from 'deprecated-react-native-prop-types'.",
      );
      },
      get EdgeInsetsPropType(): $FlowFixMe {
      invariant(
    false,
    "EdgeInsetsPropType has been removed from React Native. Migrate to " +
      "EdgeInsetsPropType exported from 'deprecated-react-native-prop-types'.",
   );
   },
   get PointPropType(): $FlowFixMe {
   invariant(
    false,
    "PointPropType has been removed from React Native. Migrate to " +
     "PointPropType exported from 'deprecated-react-native-prop-types'.",
   );
   },
   get ViewPropTypes(): $FlowFixMe {
   invariant(
   false,
   "ViewPropTypes has been removed from React Native. Migrate to " +
     "ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
   );
   },

   

to this: 

   // Deprecated Prop Types
    get ColorPropType(): $FlowFixMe {
    return require("deprecated-react-native-prop-types").ColorPropType
    },
     get EdgeInsetsPropType(): $FlowFixMe {
    return require("deprecated-react-native-prop-types").EdgeInsetsPropType
    },
     get PointPropType(): $FlowFixMe {
    return require("deprecated-react-native-prop-types").PointPropType
    },
    get ViewPropTypes(): $FlowFixMe {
    return require("deprecated-react-native-prop-types").ViewPropTypes
    },



4. Run npx patch-package react-native to save the patch.
5. Rebuild the app. 
    
        Only thing to keep in mind is that this patch will need to be reapplied with every upgrade to react-native, or until the libraries in question are updated to import from deprecated-react-native-prop-types instead.