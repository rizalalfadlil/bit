import React, { useState, useEffect } from 'react';
import { Input, Progress, Image, Tooltip } from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  LoadingOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const App = () => {
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teksHasil, setTeksHasil] = useState('teks');
  const [image, setImage] = useState();

  const twoColors = {
    '100%': '#FF8076',
    '50%': '#FFEA76',
    '0%': '#4AFF91',
  };

  useEffect(() => {
    const hitungKesejahteraan = () => {
      setLoading(true);

      

      // Menggunakan fungsi hash sederhana untuk menghasilkan nilai acak yang konsisten berdasarkan nama
      const hash = (str) => {
        let hashValue = 0;
        if (str.length === 0) return hashValue;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hashValue = (hashValue << 5) - hashValue + char;
          hashValue = hashValue & hashValue; // Convert to 32bit integer
        }
        return Math.abs(hashValue % 101); // Ambil nilai mutlak dan batasi ke rentang 0-100
      };
      
      const persentaseBaik = hash(nama);
      setHasil(persentaseBaik);
      if(persentaseBaik > 80){
        setTeksHasil('bit karbittt... Raja karbit Dewa karbit bit... bit...')
        setColor('dark');
        setImage('5.jpeg');
      }else if(persentaseBaik <80 && persentaseBaik >60){
        setTeksHasil('ini dia Raja karbit');
        setColor('danger');
        setImage('4.jpeg')
      }else if(persentaseBaik <60 && persentaseBaik >40){
        setTeksHasil('Lu karbit');
        setColor('danger');
        setImage('3.jpeg');
      }else if(persentaseBaik <40 && persentaseBaik >20){
        setTeksHasil('Kok kamu karbit bang?')
        setColor('warning');
        setImage('2.jpeg')
      }else {
        setTeksHasil('Kamu setia');
        setColor('success');
        setImage('1.gif');
      }
      
      setLoading(false);
    };

    if (nama) {
      hitungKesejahteraan();
    }
  }, [nama]);

  return (
    <div className="App bg-secondary bg-opacity-25">
      <div className='p-2 d-flex align-items-center justify-content-center' style={{height:'100vh'}}>
      <div className='border p-5 container bg-light rounded'>
      <h1 className='fw-bold'>Seberapa karbit kamu</h1>
      <h3 className='mb-5 text-secondary fw-light'>Tulis namamu</h3>
      <Input
        placeholder="Tulis Nama"
        value={nama}
        className='rounded-pill'
        onChange={(e) => setNama(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <div className='mt-3'>
      {loading ? (
        <LoadingOutlined style={{scale:'2', color:'#4A95FF'}}/>
      ) : (
        (hasil !== null && nama !== '') && (
          <>
          <Progress percent={hasil} className="rounded-0" size={['default', 30]} format={(percent) => percent} strokeColor={twoColors}/>
          <div className='row fw-bold mt-2 '>
            <span className='col text-start text-success'>setia</span>
            <span className='col text-end text-danger'>karbit</span>
          </div>
          <h5>{nama} {hasil}%, Kamu...</h5>
          <h1 className={`text-${color} fw-bold`}>{teksHasil}</h1>
          <Image src={image} preview={false} width={200}/>
          <p className='text-end w-100'><Tooltip title='hanya untuk candaan dan bukan beneran'><InfoCircleOutlined/></Tooltip></p>
          </>
        )
      )}
      
      
      </div>
      </div>
      </div>
    </div>
  );
};

export default App;
