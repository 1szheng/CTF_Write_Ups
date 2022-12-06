#!/usr/bin/env python3

import random, time
from pwn import *
from randcrack import RandCrack

def recvnum(r):
    return int(r.recvline().strip().decode().split()[1])

r = remote('157.245.52.169', 31841)
rc = RandCrack()

for _ in range(312):
    r.sendline(b"1")
    r.recvuntil(b"your character:\n", timeout=1)
    STR = recvnum(r)
    DEX = recvnum(r)
    INT = recvnum(r)
    LUK = recvnum(r)
    
    r2 = (STR << 16) + DEX
    r1 = (INT << 16) + LUK
    rc.submit(r1)
    rc.submit(r2)

r1 = rc.predict_getrandbits(32)
r2 = rc.predict_getrandbits(32)
r3 = (r2 << 32) + r1

r.sendline(b"2")
r.recvuntil(b"Enter your lucky number:")
r.sendline(str(r3))

r.interactive()