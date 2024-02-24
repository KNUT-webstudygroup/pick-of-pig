import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Image from 'next/image';
import MapNode from '@/service/MapObject/MapNode';
import getStarScore from '@/utils/getStarScore';

interface MapNodeCardProps {
  index: number;
  node: MapNode;
}

function MapNodeCard({ index, node }: MapNodeCardProps) {
  const [starsArray, setStarsArray] = useState<number[]>([]);

  useEffect(() => {
    const score = node.GetScore(node.location);
    const star = getStarScore(score);
    setStarsArray(Array.from({ length: star }));
  }, [node]);

  return (
    <>
      <GlobalStyle />
      <MapNodeContainer>
        <MapNodeCover>
          <MapNodeStar>
            {starsArray.map((_, i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3203 8.93597L14.7969 12.011L15.8524 16.5891C15.9082 16.8284 15.8923 17.0789 15.8065 17.3092C15.7208 17.5396 15.5691 17.7395 15.3703 17.8841C15.1716 18.0286 14.9346 18.1114 14.6891 18.122C14.4436 18.1326 14.2004 18.0706 13.9899 17.9438L9.99689 15.5219L6.01252 17.9438C5.80202 18.0706 5.55881 18.1326 5.31328 18.122C5.06775 18.1114 4.83079 18.0286 4.63204 17.8841C4.4333 17.7395 4.28157 17.5396 4.19584 17.3092C4.1101 17.0789 4.09416 16.8284 4.15002 16.5891L5.20392 12.0157L1.6797 8.93597C1.49331 8.7752 1.35852 8.56298 1.29225 8.32592C1.22598 8.08886 1.23117 7.83751 1.30718 7.60339C1.38319 7.36927 1.52663 7.16281 1.71952 7.00988C1.9124 6.85696 2.14614 6.76439 2.39142 6.74378L7.03674 6.34143L8.85002 2.01643C8.94471 1.78949 9.10443 1.59564 9.30907 1.45929C9.51371 1.32294 9.75411 1.25018 10 1.25018C10.2459 1.25018 10.4863 1.32294 10.691 1.45929C10.8956 1.59564 11.0553 1.78949 11.15 2.01643L12.9688 6.34143L17.6125 6.74378C17.8578 6.76439 18.0915 6.85696 18.2844 7.00988C18.4773 7.16281 18.6207 7.36927 18.6968 7.60339C18.7728 7.83751 18.778 8.08886 18.7117 8.32592C18.6454 8.56298 18.5106 8.7752 18.3242 8.93597H18.3203Z" fill="#FFF500" />
              </svg>
            ))}
          </MapNodeStar>
          <MapNodeIndex>
            {index}
          </MapNodeIndex>
        </MapNodeCover>
        <MapNodeContent>
          <MapNodeName>
            {node.name}
          </MapNodeName>
          <MapNodeImage>
            {/* 임시 사진 */}
            <Image src="/pasta.jpeg" height="75" width="75" alt="가게 사진" />
          </MapNodeImage>
        </MapNodeContent>
      </MapNodeContainer>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    src: url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot);
    font-family: 'Nanum Gothic', serif;
  }
`;

const MapNodeContainer = styled.div`
    display: flex;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    width: 230px;
    height: 130px;
    margin: 4px 0px 4px 0px;
`;

const MapNodeCover = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #FF4B4B;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    width: 70px;
    height: 130px;
`;

const MapNodeContent = styled.div`
    display: flex;
    flex-direction: column;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    width: 160px;
    height: 130px;
`;

const MapNodeIndex = styled.div`
    color: white;
    font-size: 18px;
    font-weight: 600;
    padding: 12px 8px 0px 0px;
`;

const MapNodeStar = styled.div`
    display: flex;
    flex-direction: column;
    align-self: start;
    padding: 14px 0px 0px 12px;
`;

const MapNodeName = styled.div`
    color: #4B3F4E;
    font-size: 18px;
    font-weight: 600;
    padding: 12px 0px 0px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 8em;
`;

const MapNodeImage = styled.div`
    height: 75px;
    width: 75px;
    margin: 10px 10px 10px 10px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default MapNodeCard;
