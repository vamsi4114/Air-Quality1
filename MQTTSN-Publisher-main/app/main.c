/*
 * Copyright (C) 2020 Peter Sjödin, KTH
 *
 * This file is subject to the terms and conditions of the GNU Lesser
 * General Public License v2.1. See the file LICENSE in the top level
 * directory for more details.
 */

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include "shell.h"
#include "net/emcute.h"
#include "net/ipv6/addr.h"

#include "pms5003.h"
#include "periph/rtt.h"
#include "periph/i2c.h"
#include "thread.h"
#include "xtimer.h"
#include "msg.h"
#include "board.h"
#include <errno.h>

#ifdef MODULE_MQTTSN_PUBLISHER
#include "mqttsn_publisher.h"
#endif

#if 0
static int run_mqttsn(int argc, char **argv)
{
    if (argc != 1) {
        printf("Usage: %s\n", argv[0]);
        return 1;
    }
    mqttsn_publisher_init();
    return 0;
}
#endif

static int cmd_read(__attribute__((unused)) int ac, __attribute__((unused)) char **av)
{
  printf("PM[1 2.5 10]: %-u %-u %-u\n", pms5003_pm1(), pms5003_pm2_5(), pms5003_pm10());
  printf("DB[0.3 0.5 1.0 2.5 5 10]: %-u %-u %-u %-u %-u %-u\n", pms5003_db0_3(), pms5003_db0_5(),
	 pms5003_db1(),  pms5003_db2_5(), pms5003_db5(), pms5003_db10());
  return 0;
}

static const shell_command_t shell_commands[] = {
#ifdef MODULE_MQTTSN_PUBLISHER
    { "mqstat", "print MQTT status", mqttsn_stats_cmd},
#endif /* MODULE_MQTTSN_PUBLISHER */
	{ "read", "read PM sensor data", cmd_read},
    { NULL, NULL, NULL }
};

#define MAIN_QUEUE_SIZE     (8)
static msg_t _main_msg_queue[MAIN_QUEUE_SIZE];

static char line_buf[SHELL_DEFAULT_BUFSIZE];



int main(void)
{
	pms5003_init();
    ///* the main thread needs a msg queue to be able to run `ping6`*/
    msg_init_queue(_main_msg_queue, ARRAY_SIZE(_main_msg_queue));

#ifdef AUTO_INIT_MQTTSN
    mqttsn_publisher_init();
#endif /* AUTO_INIT_MQTTSN */
    /* start shell */
    shell_run(shell_commands, line_buf, SHELL_DEFAULT_BUFSIZE);
    /* should never be reached */
    return 0;
}
