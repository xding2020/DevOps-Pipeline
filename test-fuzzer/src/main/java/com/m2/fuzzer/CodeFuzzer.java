package com.m2.fuzzer;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.VariableDeclarator;
import com.github.javaparser.ast.expr.BinaryExpr;
import com.github.javaparser.ast.expr.BinaryExpr.Operator;
import com.github.javaparser.ast.expr.Expression;
import com.github.javaparser.ast.expr.StringLiteralExpr;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;
import org.apache.commons.lang3.RandomStringUtils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class CodeFuzzer {

	public static final String WORKINGDIR = "/src/www/fuzzer/iTrust/src/test/java/edu/ncsu/csc/itrust/";
	public final static int SEED = 100;

	public static boolean randomBoolean(float probability) {
		return Math.random() > probability;
	}

	public static void fuzzing(File dir) {
		new DirExplorer((level, path, file) -> path.endsWith(".java") && path.contains("Test")
				&& !path.contains("TestDataGenerator"), (level, path, file) -> {
					if (randomBoolean(0.9f))
						return;
					CompilationUnit cu = null;
					try {
						cu = JavaParser.parse(file);
					} catch (Exception e1) {
						e1.printStackTrace();
					}

					new VoidVisitorAdapter<Object>() {
						@Override
						public void visit(BinaryExpr n, Object arg) {
							super.visit(n, arg);
							if (n.getOperator() == Operator.EQUALS) {
								if (randomBoolean(0.25f)) {
									n.setOperator(Operator.NOT_EQUALS);
								}
							}

							if (n.getOperator() == Operator.NOT_EQUALS) {
								if (randomBoolean(0.15f)) {
									n.setOperator(Operator.EQUALS);
								}
							}

							if (n.getOperator() == Operator.OR) {
								if (randomBoolean(0.25f)) {
									n.setOperator(Operator.AND);
								}
							}

							if (n.getOperator() == Operator.AND) {
								if (randomBoolean(0.22f)) {
									n.setOperator(Operator.OR);
								}
							}

							if (n.getOperator() == Operator.GREATER) {
								if (randomBoolean(0.25f)) {
									n.setOperator(Operator.LESS);
								}
							}

							if (n.getOperator() == Operator.LESS) {
								if (randomBoolean(0.45f)) {
									n.setOperator(Operator.GREATER);
								}
							}

							if (n.getOperator() == Operator.GREATER_EQUALS) {
								if (randomBoolean(0.25f)) {
									n.setOperator(Operator.LESS_EQUALS);
								}
							}

							if (n.getOperator() == Operator.LESS_EQUALS) {
								if (randomBoolean(0.35f)) {
									n.setOperator(Operator.GREATER_EQUALS);
								}
							}
						}

						@Override
						public void visit(VariableDeclarator declarator, Object arg) {
							super.visit(declarator, arg);

							Expression expression = null;
							if (declarator.getInitializer().isPresent()) {
								expression = declarator.getInitializer().get();
								if (expression instanceof StringLiteralExpr) {
									String origValue = ((StringLiteralExpr) expression).getValue();
									String modifiedValue = RandomStringUtils.randomAlphabetic(origValue.length());
									if (randomBoolean(0.45f)) {
										((StringLiteralExpr) expression).setValue(modifiedValue);
									}
								}
							}
						}
					}.visit(cu, null);
					String fuzzedCode = cu.toString();
					writeCompilationUnitToFile(file, fuzzedCode);
				}).explore(dir);
	}

	public static void writeCompilationUnitToFile(File file, String content) {
		BufferedWriter bw = null;
		FileWriter fw = null;
		try {
			fw = new FileWriter(file);
			bw = new BufferedWriter(fw);
			bw.write(content);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (bw != null)
					bw.close();
				if (fw != null)
					fw.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}

	public static void main(String[] args) {
		File dir = new File(WORKINGDIR);
		fuzzing(dir);
	}
}
