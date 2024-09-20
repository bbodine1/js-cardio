'use client'

export const DEFAULT_TESTS = {
	beginner: [
		{
			id: '1725236503587',
			name: 'Reverse a String',
			code: "// CHALLENGE 1: REVERSE A STRING\n// Return a string in reverse\n// ex. reverseString('hello') === 'olleh'\n\nfunction reverseString(str) {\n  return 'Let\\'s Start'\n}",
			assertions:
				"assert(reverseString('hello') === 'olleh', \"reverseString('hello') should return 'olleh'\");\nassert(reverseString('javascript') === 'tpircsavaj', \"reverseString('javascript') should return 'tpircsavaj'\");\nassert(reverseString('12345') === '54321', \"reverseString('12345') should return '54321'\");\nassert(reverseString('') === '', \"reverseString('') should return ''\");\nassert(reverseString('a') === 'a', \"reverseString('a') should return 'a'\");\n",
		},
		{
			id: '1725236503589',
			name: 'Validate a Palindrome',
			code: "// CHALLENGE 2: VALIDATE A PALINDROME\n// Return true if palindrome and false if not\n// ex. isPalindrome('racecar') === 'true',\n// ex. isPalindrome('hello') == false\n\nfunction isPalindrome(str) {}",
			assertions:
				"assert(isPalindrome('racecar') === true, \"isPalindrome('racecar') should return true\");\nassert(isPalindrome('hello') === false, \"isPalindrome('hello') should return false\");\nassert(isPalindrome('A man, a plan, a canal: Panama') === true, \"isPalindrome('A man, a plan, a canal: Panama') should return true\");\nassert(isPalindrome('race a car') === false, \"isPalindrome('race a car') should return false\");\nassert(isPalindrome('') === true, \"isPalindrome('') should return true\");\n",
		},
		{
			id: '1725236503590',
			name: 'Reverse an Integer',
			code: '// CHALLENGE 3: REVERSE AN INTEGER\n// Return an integer in reverse\n// ex. reverseInt(521) === 125\n\nfunction reverseInt(int) {}',
			assertions:
				'assert(reverseInt(521) === 125, "reverseInt(521) should return 125");\nassert(reverseInt(-123) === -321, "reverseInt(-123) should return -321");\nassert(reverseInt(120) === 21, "reverseInt(120) should return 21");\nassert(reverseInt(0) === 0, "reverseInt(0) should return 0");\nassert(reverseInt(1534236469) === 9646324351, "reverseInt(1534236469) should return 9646324351");\n',
		},
		{
			id: '1725236503591',
			name: 'Capitalize Letters',
			code: "// CHALLENGE 4: CAPITALIZE LETTERS\n// Return a string with the first letter\n// of every word capitalized\n// ex. capitalizeLetters('i love javascript') === 'I Love Javascript'\n\nfunction capitalizeLetters(str) {}",
			assertions:
				"assert(capitalizeLetters('i love javascript') === 'I Love Javascript', \"capitalizeLetters('i love javascript') should return 'I Love Javascript'\");\nassert(capitalizeLetters('hello world') === 'Hello World', \"capitalizeLetters('hello world') should return 'Hello World'\");\nassert(capitalizeLetters('') === '', \"capitalizeLetters('') should return ''\");\nassert(capitalizeLetters('a b c d') === 'A B C D', \"capitalizeLetters('a b c d') should return 'A B C D'\");\nassert(capitalizeLetters('follow THE yellow BRICK road') === 'Follow The Yellow Brick Road', \"capitalizeLetters('follow THE yellow BRICK road') should return 'Follow The Yellow Brick Road'\");\n",
		},
		{
			id: '1725236503592',
			name: 'Max Character',
			code: "// CHALLENGE 5: MAX CHARACTER\n// Return the character that is most common in a string\n// ex. maxCharacter('javascript') == 'a'\n\nfunction maxCharacter(str) {}",
			assertions:
				"assert(maxCharacter('javascript') === 'a', \"maxCharacter('javascript') should return 'a'\");\nassert(maxCharacter('hello') === 'l', \"maxCharacter('hello') should return 'l'\");\nassert(maxCharacter('1111222233') === '1', \"maxCharacter('1111222233') should return '1'\");\nassert(maxCharacter('') === '', \"maxCharacter('') should return ''\");\nassert(maxCharacter('aabbbcccc') === 'c', \"maxCharacter('aabbbcccc') should return 'c'\");\n",
		},
		{
			id: '1725236503593',
			name: 'FizzBuzz',
			code: '// CHALLENGE 6: FIZZBUZZ\n// Write a program that logs all the numbers\n// from 1 to 100.\n// For multiples of 3, instead of the number,\n// log "Fizz", for multiples of 5 log "Buzz".\n// For numbers which are multiples of both 3 and 5,\n// log "FizzBuzz".\n// (use console.log in the function)\n\nfunction fizzBuzz() {}',
			assertions:
				"// Note: FizzBuzz doesn't return a value, it prints to console. We'll test the first few numbers.\nlet output = [];\nconsole.log = (msg) => { output.push(msg); };\nfizzBuzz();\nassert(output[0] === 1, \"First output should be 1\");\nassert(output[1] === 2, \"Second output should be 2\");\nassert(output[2] === 'Fizz', \"Third output should be 'Fizz'\");\nassert(output[4] === 'Buzz', \"Fifth output should be 'Buzz'\");\nassert(output[14] === 'FizzBuzz', \"15th output should be 'FizzBuzz'\");\n",
		},
	],
	intermediate: [
		{
			id: '1725236503594',
			name: 'Longest Word',
			code: "// CHALLENGE 1: LONGEST WORD\n// Return the longest word of a string\n// ex. longestWord('Hi there, my name is Brad') === 'there,'\n\n// SOLUTION 1 - Return a single longest word\n// SOLUTION 2 - Return an array and include multiple words if they have the same length\n// SOLUTION 3 - Only return an array if multiple words, otherwise return a string\n\nfunction longestWord(sen) {\n\n}",
			assertions:
				"assert(longestWord('Hi there, my name is Brad') === 'there,', \"longestWord('Hi there, my name is Brad') should return 'there,'\");\nassert(JSON.stringify(longestWord('Hello, my name is Brad')) === JSON.stringify(['Hello,', 'name']), \"longestWord('Hello, my name is Brad') should return ['Hello,', 'name']\");\nassert(longestWord('Brad') === 'Brad', \"longestWord('Brad') should return 'Brad'\");\nassert(JSON.stringify(longestWord('I love dogs')) === JSON.stringify(['love', 'dogs']), \"longestWord('I love dogs') should return ['love', 'dogs']\");\nassert(longestWord('') === '', \"longestWord('') should return ''\");\n",
		},
		{
			id: '1725236503595',
			name: 'Array Chunking',
			code: '// CHALLENGE 2: ARRAY CHUNKING\n// Split an array into chunked arrays of a specific length\n// ex. chunkArray([1, 2, 3, 4, 5, 6, 7], 3) === [[1, 2, 3],[4, 5, 6],[7]]\n// ex. chunkArray([1, 2, 3, 4, 5, 6, 7], 2) === [[1, 2],[3, 4],[5, 6],[7]]\n\nfunction chunkArray(arr, len) {}',
			assertions:
				'assert(JSON.stringify(chunkArray([1, 2, 3, 4, 5, 6, 7], 3)) === JSON.stringify([[1, 2, 3],[4, 5, 6],[7]]), "chunkArray([1, 2, 3, 4, 5, 6, 7], 3) should return [[1, 2, 3],[4, 5, 6],[7]]");\nassert(JSON.stringify(chunkArray([1, 2, 3, 4, 5, 6, 7], 2)) === JSON.stringify([[1, 2],[3, 4],[5, 6],[7]]), "chunkArray([1, 2, 3, 4, 5, 6, 7], 2) should return [[1, 2],[3, 4],[5, 6],[7]]");\nassert(JSON.stringify(chunkArray([1, 2, 3, 4, 5], 1)) === JSON.stringify([[1],[2],[3],[4],[5]]), "chunkArray([1, 2, 3, 4, 5], 1) should return [[1],[2],[3],[4],[5]]");\nassert(JSON.stringify(chunkArray([], 5)) === JSON.stringify([]), "chunkArray([], 5) should return []");\nassert(JSON.stringify(chunkArray([1, 2, 3, 4, 5], 10)) === JSON.stringify([[1, 2, 3, 4, 5]]), "chunkArray([1, 2, 3, 4, 5], 10) should return [[1, 2, 3, 4, 5]]");\n',
		},
		{
			id: '1725236503596',
			name: 'Flatten Array',
			code: '// CHALLENGE 3: FLATTEN ARRAY\n// Take an array of arrays and flatten to a single array\n// ex. [[1, 2], [3, 4], [5, 6], [7]] = [1, 2, 3, 4, 5, 6, 7]\n\nfunction flattenArray(arrays) {}',
			assertions:
				"assert(JSON.stringify(flattenArray([[1, 2], [3, 4], [5, 6], [7]])) === JSON.stringify([1, 2, 3, 4, 5, 6, 7]), \"flattenArray([[1, 2], [3, 4], [5, 6], [7]]) should return [1, 2, 3, 4, 5, 6, 7]\");\nassert(JSON.stringify(flattenArray([[1], [2], [3], [4]])) === JSON.stringify([1, 2, 3, 4]), \"flattenArray([[1], [2], [3], [4]]) should return [1, 2, 3, 4]\");\nassert(JSON.stringify(flattenArray([['a', 'b'], ['c', 'd'], ['e']])) === JSON.stringify(['a', 'b', 'c', 'd', 'e']), \"flattenArray([['a', 'b'], ['c', 'd'], ['e']]) should return ['a', 'b', 'c', 'd', 'e']\");\nassert(JSON.stringify(flattenArray([])) === JSON.stringify([]), \"flattenArray([]) should return []\");\nassert(JSON.stringify(flattenArray([[]])) === JSON.stringify([]), \"flattenArray([[]]) should return []\");\n",
		},
		{
			id: '1725236503597',
			name: 'Anagram',
			code: "// CHALLENGE 4: ANAGRAM\n// Return true if anagram and false if not\n// ex. 'elbow' === 'below'\n// ex. 'Dormitory' === 'dirty room##'\n\nfunction isAnagram(str1, str2) {}",
			assertions:
				"assert(isAnagram('elbow', 'below') === true, \"isAnagram('elbow', 'below') should return true\");\nassert(isAnagram('Dormitory', 'dirty room##') === true, \"isAnagram('Dormitory', 'dirty room##') should return true\");\nassert(isAnagram('Hello', 'Aloha') === false, \"isAnagram('Hello', 'Aloha') should return false\");\nassert(isAnagram('', '') === true, \"isAnagram('', '') should return true\");\nassert(isAnagram('A', 'a') === true, \"isAnagram('A', 'a') should return true\");\n",
		},
		{
			id: '1725236503598',
			name: 'Letter Changes',
			code: "// CHALLENGE 5: LETTER CHANGES\n// Change every letter of the string to the one that follows it and capitalize the vowels\n// Z should turn to A\n// ex. 'hello there' === 'Ifmmp UIfsf'\n\nfunction letterChanges(str) {}",
			assertions:
				"assert(letterChanges('hello there') === 'Ifmmp UIfsf', \"letterChanges('hello there') should return 'Ifmmp UIfsf'\");\nassert(letterChanges('zZ') === 'aA', \"letterChanges('zZ') should return 'aA'\");\nassert(letterChanges('a b c d') === 'b c d E', \"letterChanges('a b c d') should return 'b c d E'\");\nassert(letterChanges('') === '', \"letterChanges('') should return ''\");\nassert(letterChanges('123') === '123', \"letterChanges('123') should return '123'\");\n",
		},
	],
	advanced: [
		{
			id: '1725236503599',
			name: 'Add All Numbers',
			code: '// CHALLENGE 1: ADD ALL NUMBERS\n// Return a sum of all parameters entered regardless of the amount of numbers - NO ARRAYS\n// ex. addAll(2,5,6,7) === 20\n\nfunction addAll() {}',
			assertions:
				'assert(addAll(2,5,6,7) === 20, "addAll(2,5,6,7) should return 20");\nassert(addAll(1,2,3) === 6, "addAll(1,2,3) should return 6");\nassert(addAll(5,10,15,20) === 50, "addAll(5,10,15,20) should return 50");\nassert(addAll() === 0, "addAll() should return 0");\nassert(addAll(-1,1) === 0, "addAll(-1,1) should return 0");\n',
		},
		{
			id: '1725236503600',
			name: 'Sum All Primes',
			code: '// CHALLENGE 2: SUM ALL PRIMES\n// Pass in a number to loop up to and add all of the prime numbers. A prime number is a whole number greater than 1 whose only factors are 1 and itself\n// ex. sumAllPrimes(10) == 17\n\nfunction sumAllPrimes() {}',
			assertions:
				'assert(sumAllPrimes(10) === 17, "sumAllPrimes(10) should return 17");\nassert(sumAllPrimes(15) === 41, "sumAllPrimes(15) should return 41");\nassert(sumAllPrimes(20) === 77, "sumAllPrimes(20) should return 77");\nassert(sumAllPrimes(2) === 2, "sumAllPrimes(2) should return 2");\nassert(sumAllPrimes(1) === 0, "sumAllPrimes(1) should return 0");\n',
		},
		{
			id: '1725236503601',
			name: 'Seek & Destroy',
			code: "// CHALLENGE 3: SEEK & DESTROY\n// Remove from the array whatever is in the following arguments. Return the leftover numbers in an array\n// ex. seekAndDestroy([2, 3, 4, 6, 6, 'hello'], 2, 6) == [3, 4, 'hello']\n\nfunction seekAndDestroy() {}",
			assertions:
				"assert(JSON.stringify(seekAndDestroy([2, 3, 4, 6, 6, 'hello'], 2, 6)) === JSON.stringify([3, 4, 'hello']), \"seekAndDestroy([2, 3, 4, 6, 6, 'hello'], 2, 6) should return [3, 4, 'hello']\");\nassert(JSON.stringify(seekAndDestroy([1, 2, 3, 4, 5], 2, 4)) === JSON.stringify([1, 3, 5]), \"seekAndDestroy([1, 2, 3, 4, 5], 2, 4) should return [1, 3, 5]\");\nassert(JSON.stringify(seekAndDestroy([1, 2, 3, 'hello'], 1, 3)) === JSON.stringify([2, 'hello']), \"seekAndDestroy([1, 2, 3, 'hello'], 1, 3) should return [2, 'hello']\");\nassert(JSON.stringify(seekAndDestroy([1, 2, 3, 4, 5, 6], 6, 4, 5)) === JSON.stringify([1, 2, 3]), \"seekAndDestroy([1, 2, 3, 4, 5, 6], 6, 4, 5) should return [1, 2, 3]\");\nassert(JSON.stringify(seekAndDestroy([], 1, 2, 3)) === JSON.stringify([]), \"seekAndDestroy([], 1, 2, 3) should return []\");\n",
		},
		{
			id: '1725236503602',
			name: 'Sort By Height',
			code: '// CHALLENGE 4: SORT BY HEIGHT\n// Some people are standing in a row in a park. There are trees between them which cannot be moved. Your task is to rearrange the people by their heights in a non-descending order without moving the trees.\n// ex.\n// a = [-1, 150, 190, 170, -1, -1, 160, 180]\n// sortByHeight(a) == [-1, 150, 160, 170, -1, -1, 180, 190]\n\nfunction sortByHeight() {}',
			assertions:
				'assert(JSON.stringify(sortByHeight([-1, 150, 190, 170, -1, -1, 160, 180])) === JSON.stringify([-1, 150, 160, 170, -1, -1, 180, 190]), "sortByHeight([-1, 150, 190, 170, -1, -1, 160, 180]) should return [-1, 150, 160, 170, -1, -1, 180, 190]");\nassert(JSON.stringify(sortByHeight([-1, -1, -1, -1, -1])) === JSON.stringify([-1, -1, -1, -1, -1]), "sortByHeight([-1, -1, -1, -1, -1]) should return [-1, -1, -1, -1, -1]");\nassert(JSON.stringify(sortByHeight([4, 2, 9, 11, 2, 16])) === JSON.stringify([2, 2, 4, 9, 11, 16]), "sortByHeight([4, 2, 9, 11, 2, 16]) should return [2, 2, 4, 9, 11, 16]");\nassert(JSON.stringify(sortByHeight([23, -1, 54, -1, 43, 1])) === JSON.stringify([1, -1, 23, -1, 43, 54]), "sortByHeight([23, -1, 54, -1, 43, 1]) should return [1, -1, 23, -1, 43, 54]");\nassert(JSON.stringify(sortByHeight([])) === JSON.stringify([]), "sortByHeight([]) should return []");\n',
		},
		{
			id: '1725236503603',
			name: 'Missing Letters',
			code: '// CHALLENGE 5: MISSING LETTERS\n// Find the missing letter in the passed letter range and return it. If all letters are present, return undefined\n// ex.\n// missingLetters("abce") == "d"\n// missingLetters("abcdefghjklmno") == "i"\n// missingLetters("abcdefghijklmnopqrstuvwxyz") == undefined\n\nfunction missingLetters() {}',
			assertions:
				'assert(missingLetters("abce") === "d", "missingLetters(\\"abce\\") should return \\"d\\"");\nassert(missingLetters("abcdefghjklmno") === "i", "missingLetters(\\"abcdefghjklmno\\") should return \\"i\\"");\nassert(missingLetters("abcdefghijklmnopqrstuvwxyz") === undefined, "missingLetters(\\"abcdefghijklmnopqrstuvwxyz\\") should return undefined");\nassert(missingLetters("bcdf") === "e", "missingLetters(\\"bcdf\\") should return \\"e\\"");\nassert(missingLetters("abc") === undefined, "missingLetters(\\"abc\\") should return undefined");\n',
		},
		{
			id: '1725236503604',
			name: 'Even & Odd Sums',
			code: '// CHALLENGE 6: EVEN & ODD SUMS\n// Take in an array and return an array of the sums of even and odd numbers\n// ex.\n// evenOddSums([50, 60, 60, 45, 71]) == [170, 116]\n\nfunction evenOddSums() {}',
			assertions:
				'assert(JSON.stringify(evenOddSums([50, 60, 60, 45, 71])) === JSON.stringify([170, 116]), "evenOddSums([50, 60, 60, 45, 71]) should return [170, 116]");\nassert(JSON.stringify(evenOddSums([1, 2, 3, 4, 5, 6])) === JSON.stringify([12, 9]), "evenOddSums([1, 2, 3, 4, 5, 6]) should return [12, 9]");\nassert(JSON.stringify(evenOddSums([1, 3, 5, 7, 9])) === JSON.stringify([0, 25]), "evenOddSums([1, 3, 5, 7, 9]) should return [0, 25]");\nassert(JSON.stringify(evenOddSums([2, 4, 6, 8])) === JSON.stringify([20, 0]), "evenOddSums([2, 4, 6, 8]) should return [20, 0]");\nassert(JSON.stringify(evenOddSums([])) === JSON.stringify([0, 0]), "evenOddSums([]) should return [0, 0]");\n',
		},
	],
}
