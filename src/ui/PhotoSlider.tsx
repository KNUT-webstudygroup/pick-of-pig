import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

function PhotoSlider({ photos }: { photos: Array<string> }) {
  const [photoLength, setPhotoLength] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [photo1, setPhoto1] = useState<string>('');
  const [photo2, setPhoto2] = useState<string>('');
  const [photo3, setPhoto3] = useState<string>('');

  useEffect(() => {
    setPhotoLength(photos.length);
    setPhoto1(photos[currentIndex]);
    setPhoto2(photos[currentIndex + 1]);
    setPhoto3(photos[currentIndex + 2]);
  }, [photos, currentIndex]);

  const handleLeftArrowClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (currentIndex < photoLength - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>

      <PhotoContainer>
        <LeftArrowIcon onClick={handleLeftArrowClick}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0412 18.0012C18.5679 18.0017 18.1088 17.8393 17.7412 17.5412L12.6412 13.3312C12.4412 13.172 12.2797 12.9697 12.1687 12.7394C12.0577 12.5091 12 12.2568 12 12.0012C12 11.7455 12.0577 11.4932 12.1687 11.2629C12.2797 11.0327 12.4412 10.8304 12.6412 10.6712L17.7412 6.46117C18.0482 6.21516 18.4182 6.06035 18.8089 6.01438C19.1996 5.96842 19.5954 6.03314 19.9512 6.20117C20.2604 6.33745 20.5238 6.55984 20.71 6.84179C20.8961 7.12373 20.9972 7.45331 21.0012 7.79117V16.2112C20.9972 16.549 20.8961 16.8786 20.71 17.1606C20.5238 17.4425 20.2604 17.6649 19.9512 17.8012C19.6653 17.9312 19.3552 17.9993 19.0412 18.0012Z" fill="#4B3F4E" />
          </svg>
        </LeftArrowIcon>

        {photo1 && <PhotoItem image={photo1} />}
        {photo2 && <PhotoItem image={photo2} />}
        {photo3 && <PhotoItem image={photo3} />}

        <RightArrowIcon onClick={handleRightArrowClick}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.95882 5.99883C5.43213 5.99827 5.8912 6.1607 6.25882 6.45883L11.3588 10.6688C11.5588 10.828 11.7203 11.0303 11.8313 11.2606C11.9423 11.4909 12 11.7432 12 11.9988C12 12.2545 11.9423 12.5068 11.8313 12.7371C11.7203 12.9673 11.5588 13.1696 11.3588 13.3288L6.25882 17.5388C5.95179 17.7848 5.58182 17.9396 5.19109 17.9856C4.80035 18.0316 4.40456 17.9669 4.04882 17.7988C3.73965 17.6626 3.47623 17.4402 3.29004 17.1582C3.10385 16.8763 3.00275 16.5467 2.99882 16.2088L2.99882 7.78883C3.00275 7.45098 3.10385 7.1214 3.29004 6.83945C3.47623 6.5575 3.73965 6.33511 4.04882 6.19883C4.33469 6.06883 4.64479 6.00068 4.95882 5.99883Z" fill="#4B3F4E" />
          </svg>
        </RightArrowIcon>
      </PhotoContainer>
    </>
  );
}

const PhotoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PhotoItem = styled.div<{ image?: string }>`
    width: 100px;
    height: 100px;
    background-image: ${({ image }) => `url(${image})`};
    background-size: cover;
    margin: 4px;
`;

const LeftArrowIcon = styled.div`

`;

const RightArrowIcon = styled.div`

`;

export default PhotoSlider;
