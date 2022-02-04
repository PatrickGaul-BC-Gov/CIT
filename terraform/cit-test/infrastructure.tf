##############################
## Azure Container Registry ##
##############################
resource "azurerm_container_registry" "citacrtest" {
  name                = "citacrtest"
  resource_group_name = var.azure_resource_group
  location            = var.azure_location
  sku                 = "Standard"
  admin_enabled       = true

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}


##############################
## Data Pipeline Storage    ##
##############################
resource "azurerm_storage_account" "citdatapipelinetest" {
  name                     = "citdatapipelinetest"
  resource_group_name      = var.azure_resource_group
  location                 = var.azure_location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}
resource "azurerm_storage_container" "citdatatest" {
  name                  = "datapipelinetest"
  storage_account_name  = azurerm_storage_account.citdatapipelinetest.name
  container_access_type = "private"
}

##############################
## Github Repo Secrets      ##
##############################
resource "github_actions_secret" "registry_username_test" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_USERNAME_TEST"
  plaintext_value = azurerm_container_registry.citacrtest.admin_username
}
resource "github_actions_secret" "registry_password_test" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_PASSWORD_TEST"
  plaintext_value = azurerm_container_registry.citacrtest.admin_password
}
resource "github_actions_secret" "registry_login_server_test" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_LOGIN_SERVER_TEST"
  plaintext_value = azurerm_container_registry.citacrtest.login_server
}