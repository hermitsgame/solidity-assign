// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Assignment {
    using SafeMath for uint256;

    bytes public constant DEFAULT_PARAMS = hex'000900080007000000000000000000000000000000000000dEaD00060005';

    constructor() public {}

    function M(bytes memory params) external pure returns (uint256,uint256,uint256,address,uint256,uint256) {
        if (params.length == 0) {
            params = DEFAULT_PARAMS;
        }
        uint256 value = 0;
        assembly {
            value := mload(add(params, 0x1E))
        }

        uint16 p1 = uint16((value >> 224) & 0xFFFF);
        uint16 p2 = uint16((value >> 208) & 0xFFFF);
        uint16 p3 = uint16((value >> 192) & 0xFFFF);
        address p4 = address(value >> 32);
        uint16 p5 = uint16((value >> 16) & 0xFFFF);
        uint16 p6 = uint16(value & 0xFFFF);

        require(p1 > 0 && p1 < 10000, "invalid p1");
        require(p2 > 0 && p2 < 10000, "invalid p2");
        require(p3 > 0 && p3 < 10000, "invalid p3");
        require(p4 != address(0), "invalid p4");
        require(p5 > 0 && p5 < 10000, "invalid p5");
        require(p6 > 0 && p6 < 10000, "invalid p6");

        return (
            uint256(p1).mul(1e14),
            uint256(p2).mul(1e14),
            uint256(p3).add(1e4).mul(1e14),
            p4,
            uint256(p5).mul(1e14),
            uint256(p6).add(1e4).mul(1e14)
        );
    }

}