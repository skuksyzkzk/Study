const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
//const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
require("@nomicfoundation/hardhat-chai-matchers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LotteryV1 Start", () => {
    async function deployLottery() {
        const Signer = await ethers.getSigners();

        const LotteryV1Contract = await ethers.getContractFactory("LotteryV1");
        const LotteryV1 = await LotteryV1Contract.deploy();

        return { LotteryV1, Signer };
    }
    let lotteryV1;
    let signers;
    before(async () => {
        const { LotteryV1, Signer } = await loadFixture(deployLottery);
        lotteryV1 = LotteryV1;
        signers = Signer;
    })

    describe("Constructor", () => {
        it("Owner should be set to signer[0]",async () =>{
            const owner = await lotteryV1.owner();
            console.log(signers[0].address);// signer 0번이 컨트랙트 오너 
            console.log(owner);
            console.log(lotteryV1.target);//컨트랙트 주소는 target
            expect(owner).to.equal(signers[0].address);
        })
    })

    describe("Enter",() =>{
        it("Should revert if a player enter less than 0.1 eth",async () =>{ 
            const enterAmt = ethers.parseEther("0.09");// way를 ETH로 변환해주는 함수 
            console.log(enterAmt);
            /*
                revert 확인시 await붙여야한다
                그리고 signers[1] 부터 플레이어로 사용하기에 connect함수를 통해 연결해준다 
                revertWith(메세지)는 저런 메시지와 함꼐 revert가 발생할 것이다라는 것을 테스트 
            */
            await expect(lotteryV1.connect(signers[1]).enter({value: enterAmt})).to.be.revertedWith("You should put more than 0.1 ether");
        });

        it("Enter 5 players and check values",async ()=> {
            const enterAmt = ethers.parseEther("0.1");

            console.log("enter 5 players start");
            console.log(enterAmt);

            await lotteryV1.connect(signers[1]).enter({value:enterAmt});
            expect(await lotteryV1.getBalance()).to.equal(enterAmt);//value equal 비교에선 expect().to.equal()사용
            expect(await lotteryV1.getPlayers()).to.deep.equal([signers[1].address]);//object(array 포함) equal 비교에선 expect().to.deep.equal() 사용

            await lotteryV1.connect(signers[2]).enter({value:enterAmt});
            expect(await lotteryV1.getBalance()).to.equal(enterAmt * ethers.toBigInt(2));//여기서 중요한 것은 형변환이다 빅넘버끼리 곱해야되므로 mul()은 없는 함수로 나옴 
            expect(await lotteryV1.getPlayers()).to.deep.equal([signers[1].address,signers[2].address]);

            await lotteryV1.connect(signers[3]).enter({value:enterAmt});
            expect(await lotteryV1.getBalance()).to.equal(enterAmt * ethers.toBigInt(3));
            expect(await lotteryV1.getPlayers()).to.deep.equal([signers[1].address,signers[2].address,signers[3].address]);

            await lotteryV1.connect(signers[4]).enter({value:enterAmt});
            expect(await lotteryV1.getBalance()).to.equal(enterAmt * ethers.toBigInt(4));
            expect(await lotteryV1.getPlayers()).to.deep.equal([signers[1].address,signers[2].address,signers[3].address,signers[4].address]);

            await lotteryV1.connect(signers[5]).enter({value:enterAmt});
            expect(await lotteryV1.getBalance()).to.equal(enterAmt * ethers.toBigInt(5));
            expect(await lotteryV1.getPlayers()).to.deep.equal([signers[1].address,signers[2].address,signers[3].address,signers[4].address,signers[5].address]);
        })

        it("PickWinner",async () => {
            console.log(">>before pickwinner");

            const account1 = await ethers.provider.getBalance(signers[1].address);
            console.log(`account 1 : ${account1}`);
            const account2 = await ethers.provider.getBalance(signers[2].address);
            console.log(`account 2 : ${account2}`);
            const account3 = await ethers.provider.getBalance(signers[3].address);
            console.log(`account 3 : ${account3}`);
            const account4 = await ethers.provider.getBalance(signers[4].address);
            console.log(`account 4 : ${account4}`);
            const account5 = await ethers.provider.getBalance(signers[5].address);
            console.log(`account 5 : ${account5}`);
            
            console.log(">>after pickwinner");
            await lotteryV1.pickWinner();// 여기서 아무것도 인자로 안넣어주면 signers[0]이 들어간다.

            const lotteryID = await lotteryV1.lotteryId();
            console.log(`Current lottey ID : ${lotteryID}`);

            expect(lotteryID).to.equal(1);
            //console.log(typeof lotteryID); BIgint 타입으로 반환됨 
            const winner = await lotteryV1.lotteryHistory[lotteryID- ethers.toBigInt(1)];
            console.log(winner);

            const account12 = await ethers.provider.getBalance(signers[1].address);
            console.log(`account 1 : ${account12}`);
            const account22 = await ethers.provider.getBalance(signers[2].address);
            console.log(`account 2 : ${account22}`);
            const account32 = await ethers.provider.getBalance(signers[3].address);
            console.log(`account 3 : ${account32}`);
            const account42 = await ethers.provider.getBalance(signers[4].address);
            console.log(`account 4 : ${account42}`);
            const account52 = await ethers.provider.getBalance(signers[5].address);
            console.log(`account 5 : ${account52}`);

        })
    });
})