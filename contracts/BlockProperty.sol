//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BlockProperty{
    
    function generateRandom() public view returns(uint8) {
        uint8 number = uint8(uint256(keccak256(abi.encodePacked(block.timestamp,block.difficulty))));
        return number;
    }
}