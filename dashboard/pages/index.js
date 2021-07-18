import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TagCloud } from 'react-tagcloud';
import {Columns, Container, Section} from 'react-bulma-components';
import Map from "google-map-react";

const data = [
  { value: 'jQuery', count: 25 },
  { value: 'MongoDB', count: 18 },
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'CSS3', count: 20 },
  { value: 'Webpack', count: 22 },
  { value: 'Babel.js', count: 7 },
  { value: 'ECMAScript', count: 25 },
  { value: 'Jest', count: 15 },
  { value: 'Mocha', count: 17 },
  { value: 'React Native', count: 27 },
  { value: 'Angular.js', count: 30 },
  { value: 'TypeScript', count: 15 },
  { value: 'Flow', count: 30 },
  { value: 'NPM', count: 11 },
]

const CustomWordCloud = (tag, size, color) => (
  <span
    key={tag.value}
    style={{
      fontSize: `${size / 2}em`,
      border: `3px solid ${color}`,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: '#260068',
    }}
  >
    {tag.value}
  </span>
)


const Home = () => {
  // hook
  const [tweet, setTweet] = useState([]);
  const [granularity,setGranularity] = useState('minutes');
  
  // init 
  // get tweet
  useEffect(async() => {
    const response = (await axios.get(`/api/hastage/${granularity}`)).data;
    setTweet(response);
  }, []);

  // render HTML
  return (
    <>
      <Section>
        <Container>
          <Columns>
            <Columns.Column >
              <TagCloud tags={data} minSize={1} maxSize={7} renderer={CustomWordCloud} />
            </Columns.Column>
            <Columns.Column size={8}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    </>
    )
}
export default Home;