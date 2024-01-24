//SPDX-License-Identifer: MIT 
pragma solidity ^0.8.15;
/*
    변수
    owner : 컨트랙트 배포자 저장 
    players :  로터리 참여하는 주소 리스트=> 이더를 전송받아야하기에 payable이여야한다 .
    lotteryId : 로터리 진행 회차 
    lotteryHistory : 로터리 각 진행회차에 우승자 저장하기 

    함수
    enter() : 사용자로부터 0.1ETH를 전송받아야된다.그리고 players 리스트에 푸시 해야됨 
    getBalance() : 해당 컨트랙트주소의 잔액을 반환한다 .
    getPlayers() : 참여한 모든 플레이어의 주소를 반환 players는 state로서 스토리지 저장이기에 반환할때는 memory로 전환 리턴해야됨 
    # 메모리로 전환하는 이유
        - 전역변수들이 저장되는 스토리지는 블록체인에 영구적으로 저장되는 것
        - 그렇기에 그 값을 반환해줄때는 메모리로 복사해서 리턴해주는 것이 안전하다 
    getRandomNumber() : 랜덤값을 생성하는데 owenr와 block.timestamp값으로 만든다 
    pickWinner()
    : 위너선택함수 호출은 컨트랙트 오너만 가능해야한다.
    : 위너를 선택한다. lottery histroy의 해당 ID에 위너를 저장후 ID를 1증가 시켜 다음 로터리로 넘어간다.
    : 그후 위너에게 전송을 한 다음 plyers 배열을 초기화시킨다.
*/
contract LotteryV1{
    address public owner;
    address payable[] public players;
    uint256 public lotteryId;
    mapping(uint256 => address) public lotteryHistory;

    modifier onlyOwner(){
        require(owner==msg.sender,"Only Owner can do this");
        _;
    }
    constructor() {
        owner = msg.sender;
    }

    function enter() public payable {
        require(msg.value >= 0.1 ether,"You should put more than 0.1 ether");
        players.push(payable(msg.sender));    
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(msg.sender,block.timestamp)));
    }

    function pickWinner() public payable onlyOwner {
        uint256 index = getRandomNumber() % players.length;
        
        lotteryHistory[lotteryId] = players[index];
        lotteryId++;

        (bool success,) =  players[index].call{value: getBalance()}("");
        require(success,"Transcation revert ");

        players = new address payable[](0);

    }

}