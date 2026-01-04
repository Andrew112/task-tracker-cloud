 provider "aws" { region = "us-east-1" }

resource "aws_dynamodb_table" "tasks" {
  name           = "Tasks"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute { name = "id" type = "S" }
}

resource "aws_iam_role" "dynamodb_access_role" {
  name = "dynamodbAccessRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{ Action = "sts:AssumeRole", Effect = "Allow", Principal = { Service = "lambda.amazonaws.com" } }]
  })
}

resource "aws_iam_policy" "dynamodb_access_policy" {
  name = "dynamodbAccessPolicy"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = ["dynamodb:PutItem","dynamodb:GetItem","dynamodb:UpdateItem","dynamodb:DeleteItem","dynamodb:Scan"],
      Resource = aws_dynamodb_table.tasks.arn
    }]
  })
}

resource "aws_iam_role_policy_attachment" "attach_policy" {
  role       = aws_iam_role.dynamodb_access_role.name
  policy_arn = aws_iam_policy.dynamodb_access_policy.arn
}
