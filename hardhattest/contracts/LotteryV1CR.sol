//SPDX-License-Identifier : MIT
pragma solidity ^0.8.19;
/*
    <Commit & Reveal>
    1) 참여자는 commit 기간 동안 secret 값을 생성 후 이를 해시하여 commit 한다.
    2) commit 기간이 끝나면, 공개(reveal) 기간동안 secret 값을 공개하며, 공개된 secret 값을 통해 seed 값이 계속 업데이트된다.
    3) 공개 기간이 끝나면, seed 값이 완성되는데 이는 안전한 랜덤값이다.

    변수 :
    commitCloses: commit 종료 블록 넘버
    revealCloses: reveal 종료 블록 넘버
    DURATION: commit 및 reveal 진행 기간 (4 blocks)
    winner: 이번 회차 승리자
    seed: 매 회차때 reveal시 얻는 secret 값에 의해 업데이트되는 랜덤값
    commitments: 참여자가 제시한 commit값

    생성자:  첫 회차의 commit, reveal 기간을 정함

    함수
    enter()  
    : 참여자가 외부에서 secret값을 생성하여 해시한후 커밋값을 생성해서 그 값으로 진입한다
    : 진입할때는 기간이 커밋기간인지 0.1ETH이상인지 확인해준다
    : 통과할경우에 Commitments에 커밋값을 추가해준다 
    createCommintment(uint256 secret)
    : 이 컨트랙트에서 커밋값을 생성하는 로직 
    : 시크릿값을 받아서 msg.sender와 해쉬하여 생성한다
    reveal(uint256 secret) 
    : commit에 참여했던 사용자가 본인의 secret값을 공개하여 seed 랜덤값 생성 
    : 커밋기간 종류부터 리빌 기간이 끝나기전까지 가능하며 커밋값이 enter시 등록한 값과 일치한지 확인 
    : seed값을 기존 seed값과 secret 값으로 업데이트 해준다음 players배열에 추가한다.
    pickWinner()
    : 블록넘버가 리빌기간이 끝난 이후면 언제든 가능 충분한 시간에도 가능하기에 온리오너일 필요 없다
    : 위너가 제로 어드래스인지 즉 아직 안뽑혔을수도 있기에 확인 
    : 위너를 선정하고 회차진행 기록에 추가 
    withdrawPrize() 
    : 위너만 인출이 가능함 
    : 위너와 커밋한것들 삭제하고 플레이어 배열 seed값을 초기화 
    : 그 다음 회차의 커밋기간과 리빌기간을 설정 
 */
contract LotteryV1CR{

}