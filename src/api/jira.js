import config from 'config'
import JiraApi from 'jira-client'

const {
  protocol = 'https',
  host,
  username,
  password
} = config.get('jira')

export default new JiraApi({
  protocol,
  host,
  username,
  password,
  apiVersion: 2,
  strictSSL: true
})
