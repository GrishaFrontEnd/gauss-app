import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import gauss from "./utils/gauss";
import { IDataAnalys } from "./utils/models";

const App: React.FC = () => {
  const [value, setValue] = React.useState<string>("0");
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value == "") {
      setValue("1");
    }
    setValue(e.target.value);
    setArrNum(gauss.getArrayRandomNumber(+value, +minValue, +maxValue));
  };
  const [minValue, setMinValue] = React.useState<string>("0");
  const handleChangeMinValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(e.target.value);
    setArrNum(gauss.getArrayRandomNumber(+value, +minValue, +maxValue));
  };
  const [maxValue, setMaxValue] = React.useState<string>("0");
  const handleChangeMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(e.target.value);
    setArrNum(gauss.getArrayRandomNumber(+value, +minValue, +maxValue));
  };
  const [isOpenResult, setIsOpenResult] = React.useState<boolean>(false);
  const [arrNum, setArrNum] = React.useState<number[]>([1]);
  const [dataAnalys, setDataAnalys] = React.useState<IDataAnalys>({
    pointCount: arrNum.length,
    mathExpec: 1,
    dispersion: 1,
    averSqrtDev: 1,
  });
  // React.useEffect(() => {
  //   setDataAnalys({
  //     pointCount: arrNum.length,
  //     mathExpec: gauss.getAverageNum(arrNum),
  //     dispersion: gauss.getDispersion(arrNum),
  //     averSqrtDev: gauss.getAverSqrtDeviation(arrNum),
  //   });
  // }, [minValue, maxValue, value]);
  const handleClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (Number(value) && Number(minValue) && Number(maxValue)) {
      setArrNum(gauss.getArrayRandomNumber(+value, +minValue, +maxValue));
      setDataAnalys({
        pointCount: arrNum.length,
        mathExpec: gauss.getAverageNum(arrNum),
        dispersion: gauss.getDispersion(arrNum),
        averSqrtDev: gauss.getAverSqrtDeviation(arrNum),
      });
      setIsOpenResult(true);
    } else {
      alert("???? ?????????? ???????????????? ?????????????? ???????????????????? ?????????????????????????????? ?? ??????????");
    }
  };
  return (
    <>
      <section className="max-w-6xl mx-auto flex flex-col p-2">
        <div>
          <h1 className="text-2xl font-bold">
            ?????????????????????????? ???????????????????? ????????????????
          </h1>
          <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ???????????????????? ?????????????????? ??????????
            </label>
            <input
              placeholder="0"
              value={value}
              onChange={handleChangeValue}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ?????????????????????? ????????????????
            </label>
            <input
              placeholder="0"
              value={minValue}
              onChange={handleChangeMinValue}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ???????????????????????? ????????????????
            </label>
            <input
              placeholder="0"
              value={maxValue}
              onChange={handleChangeMaxValue}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              className="mt-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClickBtn}
            >
              ?????????????????????????? ???? ?????????????? ?????????? ??????????
            </button>
          </div>
        </div>
        {isOpenResult && (
          <div>
            <h2 className="text-xl font-bold">
              ?????????????????? ?????????????????????????? ???????????????????? ????????????????
            </h2>
            <table className="w-full text-xl text-left text-gray-500 my-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr className="text-2xl">
                  <th className="py-3 px-6">????????????????????????????</th>
                  <th className="py-3 px-6">????????????????</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">???????????????????? ??????????</td>
                  <td className="py-4 px-6">{dataAnalys.pointCount}</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">???????????????????????????? ????????????????</td>
                  <td className="py-4 px-6">{dataAnalys.mathExpec}</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">??????????????????</td>
                  <td className="py-4 px-6">{dataAnalys.dispersion}</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">???????????????????????????????????? ????????????????????</td>
                  <td className="py-4 px-6">{dataAnalys.averSqrtDev}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <h3 className="text-2xl font-bold">???????????????????????? ????????????</h3>
              <div className="mt-5">
                <LineChart
                  width={600}
                  height={600}
                  data={gauss.getGaussArray(+value, +minValue, +maxValue)}
                >
                  <Line type="monotone" stroke="#8884d8" dataKey={"y"} />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default App;
