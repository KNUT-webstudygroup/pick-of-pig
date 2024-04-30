import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import MapNode from '@/service/MapObject/MapNode';
import getStarScore from '@/utils/getStarScore';
import { createMap } from '@/service/map';
import { getMapNode } from '@/service/search';
import MapNodeModal from './MapNodeModal';

interface MapNodeCardProps {
  index: number;
  node: MapNode;
}

function MapNodeCard({ index, node }: MapNodeCardProps) {
  const [star, setStar] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openMapNodeModal, setOpenMapNodeModal] = useState(false);

  function getOpenString(isNowOpen: boolean) {
    if (isNowOpen) return '영업중';
    return '영업전';
  }

  useEffect(() => {
    const score = node.GetScore(node.location);
    const starScore = getStarScore(score);
    setStar(starScore);

    const fetchData = async () => {
      const map = createMap();

      setStar(starScore);
      try {
        setIsOpen((await getMapNode(node.id, map)).resultObject.isopen ?? false);
      } catch (e) {
        console.log('오픈 여부를 불러올 수 없습니다.');
      }
    };

    fetchData();
  }, [node]);

  const handleMapNodeCardClick = () => {
    setOpenMapNodeModal(!openMapNodeModal);
  };

  return (
    <>
      <GlobalStyle />
      {openMapNodeModal && <MapNodeModal index={index} node={node} />}
      <MapNodeContainer onClick={handleMapNodeCardClick} image={node.photo}>
        <MapNodeContent>
          <MapNodeTitle>
            <MapNodeIndex>
              {index}
            </MapNodeIndex>
            <MapNodeName>
              {node.name}
            </MapNodeName>
          </MapNodeTitle>
          <MapNodeSubTitle>
            <MapNodeCategory>
              양식
            </MapNodeCategory>
            <MapNodeIsOpen isOpen={isOpen}>
              {getOpenString(isOpen)}
            </MapNodeIsOpen>
          </MapNodeSubTitle>
          <MapNodeStar>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3203 8.93597L14.7969 12.011L15.8524 16.5891C15.9082 16.8284 15.8923 17.0789 15.8065 17.3092C15.7208 17.5396 15.5691 17.7395 15.3703 17.8841C15.1716 18.0286 14.9346 18.1114 14.6891 18.122C14.4436 18.1326 14.2004 18.0706 13.9899 17.9438L9.99689 15.5219L6.01252 17.9438C5.80202 18.0706 5.55881 18.1326 5.31328 18.122C5.06775 18.1114 4.83079 18.0286 4.63204 17.8841C4.4333 17.7395 4.28157 17.5396 4.19584 17.3092C4.1101 17.0789 4.09416 16.8284 4.15002 16.5891L5.20392 12.0157L1.6797 8.93597C1.49331 8.7752 1.35852 8.56298 1.29225 8.32592C1.22598 8.08886 1.23117 7.83751 1.30718 7.60339C1.38319 7.36927 1.52663 7.16281 1.71952 7.00988C1.9124 6.85696 2.14614 6.76439 2.39142 6.74378L7.03674 6.34143L8.85002 2.01643C8.94471 1.78949 9.10443 1.59564 9.30907 1.45929C9.51371 1.32294 9.75411 1.25018 10 1.25018C10.2459 1.25018 10.4863 1.32294 10.691 1.45929C10.8956 1.59564 11.0553 1.78949 11.15 2.01643L12.9688 6.34143L17.6125 6.74378C17.8578 6.76439 18.0915 6.85696 18.2844 7.00988C18.4773 7.16281 18.6207 7.36927 18.6968 7.60339C18.7728 7.83751 18.778 8.08886 18.7117 8.32592C18.6454 8.56298 18.5106 8.7752 18.3242 8.93597H18.3203Z" fill="#ffd452" />
            </svg>
            <MapNodeStarText>
              {star}
              {' '}
              / 5
            </MapNodeStarText>
          </MapNodeStar>
          <MapNodeBtnContainer>
            <MapNodeBtn>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5625 9.75C6.5625 9.60082 6.50324 9.45774 6.39775 9.35225C6.29226 9.24676 6.14918 9.1875 6 9.1875C5.85082 9.1875 5.70774 9.24676 5.60225 9.35225C5.49676 9.45774 5.4375 9.60082 5.4375 9.75V12.75C5.4375 12.8992 5.49676 13.0423 5.60225 13.1477C5.70774 13.2532 5.85082 13.3125 6 13.3125C6.14918 13.3125 6.29226 13.2532 6.39775 13.1477C6.50324 13.0423 6.5625 12.8992 6.5625 12.75V9.75ZM12 9.1875C12.1492 9.1875 12.2923 9.24676 12.3977 9.35225C12.5032 9.45774 12.5625 9.60082 12.5625 9.75V12.75C12.5625 12.8992 12.5032 13.0423 12.3977 13.1477C12.2923 13.2532 12.1492 13.3125 12 13.3125C11.8508 13.3125 11.7077 13.2532 11.6023 13.1477C11.4968 13.0423 11.4375 12.8992 11.4375 12.75V9.75C11.4375 9.60082 11.4968 9.45774 11.6023 9.35225C11.7077 9.24676 11.8508 9.1875 12 9.1875ZM9.5625 9.75C9.5625 9.60082 9.50324 9.45774 9.39775 9.35225C9.29226 9.24676 9.14918 9.1875 9 9.1875C8.85082 9.1875 8.70774 9.24676 8.60225 9.35225C8.49676 9.45774 8.4375 9.60082 8.4375 9.75V12.75C8.4375 12.8992 8.49676 13.0423 8.60225 13.1477C8.70774 13.2532 8.85082 13.3125 9 13.3125C9.14918 13.3125 9.29226 13.2532 9.39775 13.1477C9.50324 13.0423 9.5625 12.8992 9.5625 12.75V9.75Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9552 2.60475C12.5982 2.46525 12.1985 2.442 11.6862 2.43825C11.5798 2.2136 11.4119 2.02379 11.2018 1.89088C10.9918 1.75797 10.7483 1.68745 10.4997 1.6875H7.49973C7.25124 1.68738 7.00783 1.75779 6.79779 1.89056C6.58775 2.02333 6.41972 2.21299 6.31323 2.4375C5.80023 2.442 5.40123 2.46525 5.04423 2.60475C4.61806 2.77145 4.24742 3.05476 3.97473 3.42225C3.69948 3.792 3.56973 4.2675 3.39273 4.92075L2.92173 6.648C2.6264 6.79642 2.36768 7.00852 2.16423 7.269C1.69773 7.86675 1.61523 8.5785 1.69848 9.3945C1.77873 10.1865 2.02848 11.184 2.34048 12.432L2.35998 12.5123C2.55798 13.3013 2.71773 13.9425 2.90823 14.4427C3.10698 14.9647 3.35973 15.3922 3.77523 15.717C4.19148 16.0417 4.66773 16.182 5.22198 16.2495C5.75298 16.3125 6.41448 16.3125 7.22823 16.3125H10.7712C11.585 16.3125 12.2457 16.3125 12.7775 16.2488C13.3325 16.1828 13.808 16.0417 14.2235 15.7162C14.6397 15.3922 14.8917 14.9647 15.0905 14.4427C15.2817 13.9425 15.4415 13.3012 15.6387 12.5115L15.659 12.4327C15.971 11.184 16.22 10.1865 16.301 9.39525C16.3835 8.57775 16.301 7.86675 15.8345 7.269C15.6312 7.0086 15.3728 6.79651 15.0777 6.648L14.6067 4.92075C14.429 4.2675 14.2992 3.792 14.0247 3.4215C13.7519 3.05429 13.3813 2.77125 12.9552 2.60475ZM5.45373 3.6525C5.61873 3.588 5.81823 3.56925 6.31398 3.564C6.52548 4.0065 6.97698 4.3125 7.49898 4.3125H10.499C11.0225 4.3125 11.474 4.0065 11.6855 3.564C12.1812 3.56925 12.3807 3.588 12.5457 3.6525C12.7752 3.7425 12.9747 3.89475 13.1217 4.09275C13.2537 4.2705 13.331 4.51875 13.5492 5.319L13.8147 6.29175C13.0362 6.1875 12.0312 6.1875 10.7825 6.1875H7.21623C5.96823 6.1875 4.96323 6.1875 4.18473 6.29175L4.45023 5.319C4.66773 4.51875 4.74573 4.2705 4.87773 4.09275C5.02458 3.89483 5.2242 3.74226 5.45373 3.6525ZM7.49973 2.8125C7.45 2.8125 7.40231 2.83225 7.36714 2.86742C7.33198 2.90258 7.31223 2.95027 7.31223 3C7.31223 3.04973 7.33198 3.09742 7.36714 3.13258C7.40231 3.16775 7.45 3.1875 7.49973 3.1875H10.4997C10.5495 3.1875 10.5971 3.16775 10.6323 3.13258C10.6675 3.09742 10.6872 3.04973 10.6872 3C10.6872 2.95027 10.6675 2.90258 10.6323 2.86742C10.5971 2.83225 10.5495 2.8125 10.4997 2.8125H7.49973ZM3.05148 7.96125C3.26073 7.6935 3.59148 7.5135 4.27398 7.4145C4.97223 7.314 5.91873 7.3125 7.26348 7.3125H10.736C12.0807 7.3125 13.0265 7.314 13.7247 7.4145C14.408 7.5135 14.7387 7.6935 14.948 7.962C15.1572 8.22975 15.2517 8.5935 15.1812 9.2805C15.11 9.9825 14.882 10.9005 14.5557 12.2055C14.348 13.0365 14.2032 13.6125 14.0397 14.043C13.8807 14.4585 13.7255 14.6783 13.5312 14.8305C13.337 14.982 13.0857 15.0788 12.644 15.132C12.1865 15.1868 11.594 15.1875 10.736 15.1875H7.26348C6.40548 15.1875 5.81223 15.1868 5.35548 15.132C4.91298 15.0795 4.66248 14.982 4.46823 14.8305C4.27323 14.6783 4.11798 14.4585 3.95973 14.043C3.79623 13.6125 3.65148 13.0365 3.44298 12.2055C3.11748 10.9005 2.88873 9.9825 2.81748 9.2805C2.74773 8.5935 2.84223 8.229 3.05148 7.96125Z" fill="white" />
              </svg>
            </MapNodeBtn>
            <MapNodeBtn>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5156 2.25C11.0637 2.25 9.79242 2.87437 9 3.92977C8.20758 2.87437 6.93633 2.25 5.48438 2.25C4.3286 2.2513 3.22053 2.71101 2.40327 3.52827C1.58601 4.34553 1.1263 5.4536 1.125 6.60938C1.125 11.5312 8.42273 15.5152 8.73352 15.6797C8.81543 15.7238 8.90699 15.7468 9 15.7468C9.09301 15.7468 9.18457 15.7238 9.26648 15.6797C9.57727 15.5152 16.875 11.5312 16.875 6.60938C16.8737 5.4536 16.414 4.34553 15.5967 3.52827C14.7795 2.71101 13.6714 2.2513 12.5156 2.25ZM9 14.5406C7.71609 13.7925 2.25 10.3845 2.25 6.60938C2.25112 5.75191 2.59224 4.92988 3.19856 4.32356C3.80488 3.71724 4.62691 3.37612 5.48438 3.375C6.85195 3.375 8.00016 4.10344 8.47969 5.27344C8.52207 5.37661 8.59416 5.46485 8.6868 5.52695C8.77945 5.58905 8.88847 5.62221 9 5.62221C9.11153 5.62221 9.22055 5.58905 9.3132 5.52695C9.40584 5.46485 9.47793 5.37661 9.52031 5.27344C9.99984 4.10133 11.148 3.375 12.5156 3.375C13.3731 3.37612 14.1951 3.71724 14.8014 4.32356C15.4078 4.92988 15.7489 5.75191 15.75 6.60938C15.75 10.3788 10.2825 13.7918 9 14.5406Z" fill="white" />
              </svg>
            </MapNodeBtn>
          </MapNodeBtnContainer>
        </MapNodeContent>
        <MapNodeCover />
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

const MapNodeContainer = styled.div<{ image?: string }>`
    display: flex;
    background-image: ${({ image }) => `url(${image})`};
    background-size: 40%;
    flex-direction: row-reverse;
    border-radius: 20px;
    width: 230px;
    height: 130px;
    margin: 4px;
`;

const MapNodeCover = styled.div`
    display: flex;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    width: 60px;
    height: 130px;
`;

const MapNodeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffb3b6;
    border-radius: 18px;
    border: 1px solid #E37D82;
    padding: 10px;
    width: 170px;
    height: 130px;
`;

const MapNodeTitle = styled.div`
    display: flex;
    flex-direction: row;
`;

const MapNodeIndex = styled.div`
    font-size: 18px;
    font-weight: 600;
    margin: 0px 8px 0px 4px;
`;

const MapNodeName = styled.div`
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 7em;
`;

const MapNodeSubTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
`;

const MapNodeCategory = styled.div`
    align-self: center;
    background-color: #45A15E;
    color: white;
    padding: 4px 10px 4px 10px;
    margin: 0px 2px 0px 2px;
    border-radius: 20px;
`;

const MapNodeIsOpen = styled.div<{ isOpen: boolean }>`
    align-self: center;
    background-color: ${(props) => (props.isOpen ? '#4C5EFF' : '#929292')};
    color: white;
    padding: 4px 10px 4px 10px;
    margin: 0px 2px 0px 2px;
    border-radius: 20px;
`;

const MapNodeStar = styled.div`
    display: flex;
    flex-direction: row;
    align-self: start;
`;

const MapNodeStarText = styled.div`
    display: flex;
    flex-direction: row;
    align-self: start;
    font-size: 18px;
    font-weight: 600;
    margin: 0px 4px 0px 4px;
`;

const MapNodeBtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const MapNodeBtn = styled.div`
    justify-content: center;
    background-color: #FF4B4B;
    color: white;
    padding: 4px 4px 0px 4px;
    margin: 0px 2px 0px 2px;
    border-radius: 20px;
`;

export default MapNodeCard;
