import { useDemoApiQuery } from '../../Services/Api/module/demoApi';

export default function Dashboard() {
  const { data, error } = useDemoApiQuery('');
  console.log(data, error);
  return <h1 className="text-3xl font-bold underline text-center text-red-500">Hello world!</h1>;
}
