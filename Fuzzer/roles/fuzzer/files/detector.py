#!/usr/bin/python

import os
import xml.etree.ElementTree as ET
from pprint import pprint

def detect():
    total = 0
    tests = {}
    report_dir = "/var/lib/jenkins/jobs/iTrust-Fuzzer/builds"
    files = obtain_files(report_dir, "junitResult.xml")
    count = True
    for filepath in files:
        tree = ET.parse(filepath)
        root = tree.getroot()
        for suite in root.iter('suite'):
            for cases in suite:
                for case in cases:
                    if count:
                        total += 1
                    class_name = case.find('className').text
                    test_name = case.find('testName').text
                    testcase = class_name + "." + test_name
                    error = case.find('errorStackTrace')
                    if testcase not in tests:
                        tests[testcase] = 0
                    if error is not None:
                        tests[testcase] += 1
        count = False

    return total, tests


def obtain_files(_dir, suffix):
    testfiles = []
    for subdir, dirs, files in os.walk(_dir):
        for filename in files:
            filepath = subdir + os.sep + filename
            if filepath.endswith(suffix):
                testfiles.append(filepath)
    return testfiles


def summarize():
    total, tests = detect()
    useless = []
    for testcase in tests:
        if tests[testcase] == 0:
            useless.append(testcase)

    useless = list(set(useless))
    pprint(useless)
    print "Summary:"
    print "=================================="
    print "Number of builds: 100"
    print "Number of testcases: " + str(total)
    print "Number of useless testcases: " + str(len(useless))
    print "=================================="

    report = open("report.txt", "w")
    report.write("Summary:\n")
    report.write("==================================\n")
    report.write("Number of builds: 100\n")
    report.write("Number of testcases: " + str(total) + "\n")
    report.write("Number of useless testcases: " + str(len(useless)) + "\n")
    report.write("==================================\n")
    report.close()


if __name__ == '__main__':
    summarize()
