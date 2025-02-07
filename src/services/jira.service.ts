import JiraClient from 'jira-client';
import config from '../config';

interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    status: { name: string };
    assignee?: { displayName: string };
    priority?: { name: string };
    issuetype: { name: string };
    updated: string;
  };
}

const jiraClient = new JiraClient({
  host: config.jira.host,
  username: config.jira.username,
  password: config.jira.password,
  protocol: 'https',
  apiVersion: '2',
  strictSSL: true
});

export async function searchJiraIssues(keyword: string) {
  try {
    const jql = `text ~ "${keyword}" ORDER BY updated DESC`;
    const response = await jiraClient.searchJira(jql, {
      maxResults: 10,
      fields: ['summary', 'status', 'assignee', 'priority', 'updated', 'issuetype'],
    });

    const issues = response.issues.map((issue: JiraIssue) => ({
      id: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status.name,
      assignee: issue.fields.assignee?.displayName || 'Unassigned',
      priority: issue.fields.priority?.name || 'None',
      type: issue.fields.issuetype.name,
      lastUpdated: issue.fields.updated,
    }));

    return {
      success: true,
      issues,
    };
  } catch (error) {
    console.error('Error searching Jira issues:', error);
    return {
      success: false,
      error: 'Failed to search Jira issues',
    };
  }
} 