export interface ITask {
  id: number | string;
  name: string;
  title: string;
  description: string;
  reporter: string;
  status: string;
  assigness: string;
  priority: string;
  position: number;
  startDate: Date;
  duedate: Date;
  originalEstimate: string;
  image: string;
  Assignees: string;
}
