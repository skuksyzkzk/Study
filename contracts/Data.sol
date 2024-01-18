//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Data {
    bool public data1 = false ;
    int public data2 = 0; // 음수 양수 가능 
    uint public data3 = 1;// 양수만 

    // gas 비용 낭비를 막기 위해서 단위를 지정해서 사용함 
    uint256 public data4 = 10000000000000;// 0 ~ 2 ^256 -1 
    uint8 public data5 = 10;// 0 ~ 2^8 -1 

    string public data6 = "fastcampus";// string은 실제로는 byte값으로 저장 
    bytes public data7 = "fastcampus";// byte값은 데이터가 들어오는 범위를 몰라서 가변적으로 메모리 사용시 쓴다 

    bytes20 public data8 = hex"1f9090aaE28b8a3dCeaDf281B0F12828e676c326";// 주소값을 표현할때 사용 
    bytes32 public data9 = hex"60aa1007f9ab6170675998ffb995aaa59d3538149e83fdb2cc2cf34da1d9dd18";// 트랜지션 해시값 

    //float public data10 =10; 솔리디티에서는 소수가 없다 

    address public data10 = 0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326;//주소타입 
}