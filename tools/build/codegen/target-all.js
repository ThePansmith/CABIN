import Juke from 'juke-build';

import { CodegenLangsTarget } from './langs/target.js';

export const CodegenAllTarget = new Juke.Target({
    dependsOn: [CodegenLangsTarget],
});

export {CodegenLangsTarget };

export default CodegenAllTarget;
