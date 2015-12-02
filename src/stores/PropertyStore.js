import {fromJS} from 'immutable'
import Store from './Store'

import LayoutPanel from '../components/properties/LayoutPanel'
import BorderPanel from '../components/properties/BorderPanel'
import SourcePanel from '../components/properties/SourcePanel'
import ContentPanel from '../components/properties/ContentPanel'
import BackgroundPanel from '../components/properties/BackgroundPanel'

class PropertyStore extends Store {

  constructor() {
    super(fromJS({
      properties: [
        { name: 'Layout', key: 'layout', panel: LayoutPanel, available: /./ },
        { name: 'Border', key: 'border', panel: BorderPanel, available: /./ },
        { name: 'Background', key: 'background', panel: BackgroundPanel, available: /./ },
        { name: 'Content', key: 'content', panel: ContentPanel, available: /^(text)$/ },
        { name: 'Source', key: 'source', panel: SourcePanel, available: /^(image)$/ }
      ]
    }))
  }

  dispatch(type, data) {
    // @todo
  }
}

export default new PropertyStore
