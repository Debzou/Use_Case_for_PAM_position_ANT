import { TagCloud } from 'react-tagcloud';
import {Section,Container} from 'react-bulma-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const Tweet = () => {
    // hook
    const [tweetWord, setTweetWord] = useState([]);
    const [listHastage, setListHastage] = useState([]);
    const [granularity,setGranularity] = useState('months');

    // init 
    // get tweet
    useEffect(async() => {
        // get data
        // map reduce
      
        const response = (await axios.get(`/api/hastage/${granularity}`)).data;
        // add data
        setTweetWord(response.result);
        // using for the reducing
        let hastageValided = [];
        // mapping data
        response.result.forEach(element=>{

            const json = JSON.parse(element);

            json.hastageList.forEach(sub_element=>{
                if (sub_element in hastageValided){
                    // reducing
                    hastageValided[sub_element]+=1;
                }else{
                    hastageValided[sub_element]=1;
                }
            });
        });

        const dataFormated = []
        // Formating data
        for (const property in hastageValided) {
            dataFormated.push({value:property,count:hastageValided[property]})
        }
        setListHastage(dataFormated);
        console.log(dataFormated);
    
    }, []);

    return(
        <>
        <Section>
            <Container>
            <TagCloud
                minSize={10}
                maxSize={35}
                tags={listHastage.sort().slice(0, 20)}
            />
            </Container>
        </Section>
        </>
    )
}

export default Tweet;