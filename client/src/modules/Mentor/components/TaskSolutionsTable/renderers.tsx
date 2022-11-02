import { ColumnsType } from 'antd/lib/table';
import { TaskSolutionsTableColumnKey, TaskSolutionsTableColumnName } from 'modules/Mentor/constants';
import { GithubUserLink } from 'components/GithubUserLink';
import { getColumnSearchProps } from 'components/Table';
import { Space, Typography } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import { MentorDashboardDto, ProfileCourseDto } from 'api';

const { Text, Link } = Typography;

export const getColumns = (course: ProfileCourseDto): ColumnsType<MentorDashboardDto> => [
  {
    key: TaskSolutionsTableColumnKey.Number,
    title: TaskSolutionsTableColumnName.Number,
    render: (_v, _r, idx) => idx + 1,
    align: 'center',
  },
  {
    key: TaskSolutionsTableColumnKey.GithubId,
    title: TaskSolutionsTableColumnName.GithubId,
    dataIndex: 'studentGithubId',
    render: (value: string) => !!value && <GithubUserLink value={value} />,
    ...getColumnSearchProps('studentGithubId'),
  },
  {
    key: TaskSolutionsTableColumnKey.Name,
    title: TaskSolutionsTableColumnName.Name,
    dataIndex: 'studentName',
    render: renderName,
    ...getColumnSearchProps('studentName'),
  },
  {
    key: TaskSolutionsTableColumnKey.Task,
    title: TaskSolutionsTableColumnName.Task,
    dataIndex: 'taskName',
    render: renderTask,
  },
  {
    key: TaskSolutionsTableColumnKey.SolutionUrl,
    title: TaskSolutionsTableColumnName.SolutionUrl,
    dataIndex: 'solutionUrl',
    render: renderSolutionUrl,
  },
  {
    key: TaskSolutionsTableColumnKey.Score,
    title: TaskSolutionsTableColumnName.Score,
    render: renderScore,
  },
  {
    key: TaskSolutionsTableColumnKey.SubmitScores,
    title: TaskSolutionsTableColumnName.SubmitScores,
    render: () => renderSubmitButton(course),
  },
];

function renderName(value: string, row: MentorDashboardDto) {
  if (!row.studentName) return value;

  return (
    <Link target="_blank" href={`/profile?githubId=${row.studentGithubId}`}>
      {value}
    </Link>
  );
}

function renderTask(value: string, row: MentorDashboardDto) {
  if (!row.taskDescriptionUrl) return value;

  return (
    <Link target="_blank" href={row.taskDescriptionUrl}>
      {value}
    </Link>
  );
}

function renderSolutionUrl(value: string, row: MentorDashboardDto) {
  if (!row.solutionUrl) return value;

  return (
    <Link target="_blank" href={row.solutionUrl}>
      {value}
    </Link>
  );
}

function renderScore(_v: string, row: MentorDashboardDto) {
  const { maxScore, resultScore } = row;
  if (maxScore == null) return null;

  return (
    <Text>
      {resultScore ?? '-'} / {maxScore}
    </Text>
  );
}

function renderSubmitButton({ alias }: ProfileCourseDto) {
  // TODO: modal window to submit scores
  return (
    <Link target="_blank" href={`/course/mentor/submit-review?course=${alias}`}>
      <Space>
        SubmitReview <SelectOutlined rotate={90} />
      </Space>
    </Link>
  );
}
