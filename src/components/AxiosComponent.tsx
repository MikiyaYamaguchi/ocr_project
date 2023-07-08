import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "http://localhost:5000/meibo";

type meiboType = {
  id: string,
  name: string,
  intro: string
}

const AxiosComponent = () => {
  const [meibo, setMeibo] = useState<meiboType[] | null>(null);

  useEffect(()=> {
    axios.get(baseURL)
      .then((response) => {
        setMeibo(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const createPost = () => {
    axios
      .post(baseURL, {
				"meibo_data": {
					"name": "太郎",
					"intro": "俺たち天下のゆとりーマン"
				}
      })
      .then((response) => {
        setMeibo(response.data.data);
      });
  }

  if (!meibo) return null;
  return (
    <>
		<table>
			<tbody>
      {meibo.map((data: meiboType) => (
				<tr>
        	<th key={data.id}>{data.name}</th>
					<td>{data.intro}</td>
				</tr>
      ))}
			</tbody>
		</table>
			<button onClick={createPost}>追加する</button>
    </>
  );
}

export default AxiosComponent;