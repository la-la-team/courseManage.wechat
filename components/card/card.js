// components/card/card.js
import { link } from '../../mixins/link'

Component({
  /**
   * Component properties
   */
  mixins: [link],
  properties: {
    courseName: {
      type: String,
      value: '课程名称'
    },
    background: {
      type: String,
      value: 'green'
    },
    teacher: {
      type: String,
      value: '老师'
    },
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {

  }
})
