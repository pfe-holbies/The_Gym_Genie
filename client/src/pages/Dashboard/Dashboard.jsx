import Navhome from '../../components/Home/Navhome';
import TableDashboard from '../../components/Dashboard/TableDashboard';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <>
      <Navhome hideLinks={false} hideNavItems={false} />
      <TableDashboard />
    </>
  );
}
