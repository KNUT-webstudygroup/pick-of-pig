export function extractAddressComponents(address: string) {
  // 주소를 공백을 기준으로 나눕니다.
  const parts = address.split(" ");

  // '대한민국'을 제외하고 시작합니다.
  const startIndex = parts[0] === "대한민국" ? 1 : 0;
  const addressComponents = parts.slice(startIndex);

  // '시/군/구/동' 정보를 포함하는 배열입니다. 필요시 이 배열에 추가 정보를 포함시킬 수 있습니다.
  const desiredComponents = ["시", "군", "구", "동"];

  // 추출된 주소 부분들 중에서 원하는 정보만을 필터링합니다.
  const extracted = addressComponents.filter((part) =>
    desiredComponents.some((component) => part.includes(component))
  );

  // 4개 모두 나오지 않는 경우, 마지막으로 나타나는 부분까지 출력합니다.
  if (extracted.length === 0) {
    return addressComponents.join(" "); // 원본 주소의 '대한민국'을 제외한 부분을 반환
  } else {
    return extracted.join(" ");
  }
}
