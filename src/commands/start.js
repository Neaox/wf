import jiraApi from '../api/jira'
import { JIRA } from '../constants'

export const command = 'start <issueIdOrKey>'
export const description = 'Assigns a ticket to you, moves it To-Do creates a new branch for that ticket based on master of the current repo.'
export const options = [
  ['-f, --force', 'Force assignment of ticket to you, even if it is already assigned to someone else, or not in the current sprint.'],
  ['-nb --no-branch', 'Assign the ticket to you without creating a branch']
]

export async function action (args) {
  const issue = await jiraApi.findIssue(args.issueIdOrKey, '', JIRA.FILTER.NONE, JIRA.FILTER.NONE)
  this.log(issue)
}
